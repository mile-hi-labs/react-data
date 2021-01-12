import Pluralize from 'pluralize';
import { camelToDash, dashToCamel } from 'utils/transforms';
import { isEmpty, logger } from 'utils/helpers';

class BaseSerializer {
  constructor(store) {
    this.store = store || {};
  }

  get attrs() {
    return {
      type: { serialize: false },
      store: { serialize: false },
      updatedAt: { serialize: false },
      createdAt: { serialize: false },
    };
  }

  get relationships() {
    return {};
  }

  // Methods
  checkAttrs(key) {
    let keys = Object.keys(this.attrs);
    return keys.includes(key) ? this.attrs[key] : {};
  }

  checkRelationships(key) {
    let keys = Object.keys(this.relationships);
    return keys.includes(key) ? this.relationships[key] : {};
  }

  // Serialize
  serialize(data) {
    let serializedData = this.serializeAttrs(data);
    logger('serializedData: ', serializedData);
    return { data: { attributes: serializedData } };
  }

  serializeAttrs(data) {
    let serializedAttrs = {};
    Object.keys(data).forEach(key => {
      let attr = this.serializeAttr(data, key);
      if (attr) {
        serializedAttrs[camelToDash(key)] = attr;
      }
    });
    return serializedAttrs;
  }

  serializeAttr(data, key) {
    if (isEmpty(data[key])) {
      return;
    }
    if (this.checkAttrs(key).serialize == false) {
      return;
    }
    if (key == 'id') {
      return parseInt(data[key]);
    }
    if (Array.isArray(data[key])) {
      if (isEmpty(data[key])) {
        return null;
      }
      if (typeof data[key][0] == 'object') {
        return this.serializeRelationships(data, key);
      }
      return JSON.stringify(data[key]);
    }
    if (typeof data[key] == 'object') {
      return this.serializeRelationship(data, key);
    }
    return data[key];
  }

  serializeRelationships(data, key) {
    let formattedData = [];
    data[key].forEach(relation => {
      if (this.checkRelationships(key).serialize == true) {
        formattedData.push(this.serializeAttrs(relation));
      }
      if (this.checkRelationships(key).serialize == 'id') {
        formattedData.push({ id: parseInt(relation.id) });
      }
    });
    return formattedData;
  }

  serializeRelationship(data, key) {
    if (this.checkRelationships(key).serialize == true) {
      if (isEmpty(data[key])) {
        return null;
      }
      return this.serializeAttrs(data[key]);
    }
    if (this.checkRelationships(key).serialize == 'id') {
      if (isEmpty(data[key])) {
        return null;
      }
      return { id: parseInt(data[key].id) };
    }
  }

  // Normalize
  normalizeArray(data = [], included = []) {
    let normalizedData = [];
    data.forEach(record => normalizedData.push(this.normalizeAttrs(record, included)));
    logger('normalizedData: ', normalizedData);
    return normalizedData;
  }

  normalize(data, included = []) {
    let normalizedData = this.normalizeAttrs(data, included);
    logger('normalizedData: ', normalizedData);
    return normalizedData;
  }

  normalizeMeta(meta) {
    let normalizedMeta = {};
    Object.keys(meta).forEach(key => {
      normalizedMeta[dashToCamel(key)] = parseInt(meta[key]);
    });
    logger('normalizedMeta: ', normalizedMeta);
    return normalizedMeta;
  }

  normalizeAttrs(data, included = []) {
    let normalizedAttrs = {};
    if (isEmpty(data)) {
      return;
    }
    Object.keys(data).forEach(key => {
      if (typeof data[key] == 'object') {
        if (key == 'attributes') {
          return Object.assign(normalizedAttrs, this.normalizeAttrs(data[key], included));
        }
        if (key == 'relationships') {
          return Object.assign(normalizedAttrs, this.normalizeRelationships(data[key], included));
        }
        return (normalizedAttrs[dashToCamel(key)] = this.normalizeAttrs(data[key], key));
      }
      return (normalizedAttrs[dashToCamel(key)] = this.normalizeAttr(data, key));
    });
    return normalizedAttrs;
  }

  normalizeAttr(data, key) {
    return data[key];
  }

  normalizeRelationships(data, included) {
    let formattedRelationships = {};
    if (isEmpty(data)) {
      return;
    }

    Object.keys(data).forEach(key => {
      let relationshipData = data[key].data;
      if (isEmpty(relationshipData)) {
        return;
      }

      if (Array.isArray(relationshipData)) {
        return (formattedRelationships[dashToCamel(key)] = relationshipData.map(relationship => this.normalizeRelationship(relationship, included)));
      }
      if (typeof relationshipData == 'object') {
        return (formattedRelationships[dashToCamel(key)] = this.normalizeRelationship(relationshipData, included));
      }
      return (formattedRelationships[dashToCamel(key)] = this.normalizeRelationship(relationshipData, included));
    });
    return formattedRelationships;
  }

  normalizeRelationship(relationship, included) {
    let include = included.find(include => include.type == relationship.type && include.id == relationship.id);
    return !isEmpty(include) ? this.normalizeAttrs(include) : {};
  }
}

export default BaseSerializer;
