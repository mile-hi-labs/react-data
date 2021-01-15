import Pluralize from 'pluralize';
import JsonApiError from 'utils/json-api-error';
import { camelToDash } from 'utils/transforms';
import { addObject, removeObject, isEmpty, logger } from 'utils/helpers';

class BaseModel {
  constructor(type, store, props = {}) {
    this.id = props.id || '';
    this.type = camelToDash(type).toLowerCase();
    this.store = store || {};
    this.axios =

    this.updatedAt = props.updatedAt || '';
    this.createdAt = props.createdAt || '';
  }

  // Storage
  attr(type, prop = '') {
    switch (type) {
      case 'decimal':
        return parseFloat(prop) || 0;

      case 'integer':
        return parseInt(prop) || 0;

      case 'string':
        return prop.toString() || '';

      default:
        return prop;
    }
  }

  // Methods
  set(prop = '', value) {
    let model = this;
    let formattedProp = prop;
    if (prop.includes('.')) {
      prop.split('.').map((p, index) => {
        prop = p;
        if (index < prop.split('.').length) {
          model = model[p];
        }
      });
    }
    model[prop] = value;
    this.store.updateAll(this.type);
  }

  setProps(props = {}) {
    return Object.keys(props).map(key => this.set(key, props[key]));
  }

  toggleProp(prop = '', value) {
    return this.set(prop, !value);
  }

  pushProp(prop, value) {
    addObject(this[prop], value);
    logger('Store: ', this.store);
  }

  removeProp(prop, value) {
    removeObject(this[prop], value);
    logger('Store: ', this.store);
  }

  setRelation(relation, value) {
    return !isEmpty(this[relation]) ? this.set(relation, value) : this.set(relation, this.store.createRecord(relation, value));
  }

  pushRelation(relation, value) {
    addObject(this[relation], value);
    logger('Store: ', this.store);
  }

  removeRelation(relation, value) {
    removeObject(this[relation], value);
    logger('Store: ', this.store);
  }

  belongsTo(modelName, data = {}) {
    return !isEmpty(data.id) ? this.store.peekOrCreateRecord(modelName, data) : data;
  }

  hasMany(modelName, data = []) {
    return !isEmpty(data.map(item => item.id)) ? data.map(item => this.store.peekOrCreateRecord(Pluralize.singular(modelName), item)) : data;
  }

  // Network calls
  async save() {
    try {
      let data = this.store.serializerFor(this.type).serialize(this);
      let response = this.id ? await this.update(data) : await this.create(data);
      let formattedResponse = this.store.serializerFor(this.type).normalize(response.data, response.included);
      this.setProps(formattedResponse);
      return formattedResponse;
    } catch (e) {
      throw JsonApiError.format(e);
    }
  }

  async create(data) {
    let adapter = this.store.adapterFor(this.type);
    let url = adapter.urlForCreateRecord(this.type);
    let response = await this.store.adapterFor().axios.post(url, data);
    return response.data;
  }

  async update(data) {
    let adapter = this.store.adapterFor(this.type);
    let url = adapter.urlForUpdateRecord(this.type, this.id);
    let response = await this.store.adapterFor().axios.put(url, data);
    return response.data;
  }

  async destroy() {
    try {
      if (this.id) {
        let adapter = this.store.adapterFor(this.type);
        let url = adapter.urlForDestroyRecord(this.type, this.id);
        let response = await this.store.adapterFor().axios.delete(url);
        let formattedResponse = this.store.serializerFor(this.type).normalize(response.data, response.included);
      }
      return this.store.removeRecord(this.type, this);
    } catch (e) {
      throw JsonApiError.format(e);
    }
  }
}

export default BaseModel;
