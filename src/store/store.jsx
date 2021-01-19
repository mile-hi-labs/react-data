import React from 'react';
import { adapterFor } from 'store/adapter-for';
import { modelFor } from 'store/model-for';
import { serializerFor } from 'store/serializer-for';
import JsonApiError from 'utils/json-api-error';
import { addObject, removeObject, timeElapsed, logger, isEmpty } from 'utils/helpers';
var StoreInstance = null;

class Store {
  constructor(props) {
    this.apiDomain = props.apiDomain || '';
    this.adapters = props.adapters || {};
    this.models = props.models || {};
    this.serializers = props.serializers || {};
    adapterFor('').set('apiDomain', props.apiDomain);
  }


  // Methods
  setState(...context) {
    Object.assign(this, ...context);
  }

  // Helpers
  adapterFor(modelName) {
    return adapterFor(this.adapters, modelName);
  }

  modelFor(modelName, data) {
    return modelFor(this.models, modelName, data);
  }

  serializerFor(modelName) {
    return serializerFor(this.serializers, modelName);
  }

  // Store Records
  createRecord(modelName, data, isNew = true) {
    let storeRecords = this.peekAll(modelName);
    let storeRecord = this.modelFor(modelName, data);
    storeRecords.push(storeRecord);
    this.setState({ [modelName]: storeRecords });
    logger('React Data: ', this);
    return storeRecord;
  }

  updateRecord(modelName, storeRecord, record) {
    this.removeRecord(modelName, storeRecord);
    return this.createRecord(modelName, record, false);
  }

  pushAll(modelName, records) {
    let storeRecords = this.peekAll(modelName);
    return records.map(record => this.pushRecord(modelName, record));
  }

  pushRecord(modelName, record) {
    let storeRecord = this.peekRecord(modelName, record.id);
    return storeRecord ? this.updateRecord(modelName, storeRecord, record) : this.createRecord(modelName, record, false);
  }

  peekAll(modelName) {
    return this[modelName] || [];
  }

  peekRecord(modelName, recordId) {
    let storeRecords = this.peekAll(modelName);
    let storeRecord = storeRecords.find(model => model.id == recordId);
    return storeRecord ? storeRecord : null;
  }

  peekOrCreateRecord(modelName, record) {
    let storeRecord = this.peekRecord(modelName, record.id);
    return storeRecord ? storeRecord : this.createRecord(modelName, record);
  }

  removeRecord(modelName, record = {}) {
    let storeRecords = this[modelName] || [];
    let storeRecord = record.id ? this.peekRecord(modelName, record.id) : storeRecords.find(model => isEmpty(model.id));
    storeRecords = removeObject(storeRecords, storeRecord);
    this.setState({ [modelName]: storeRecords });
    logger('React Data: ', this);
    return null;
  }

  removeAll(modelName, records) {
    this[modelName] = [];
    this.setState(this);
    logger('React Data: ', this);
    return null;
  }

  // Network calls
  async findAll(modelName, params) {
    let storeRecords = this.peekAll(modelName);
    if (!isEmpty(storeRecords)) {
      return storeRecords;
    }
    return await this.query(modelName, params);
  }

  async findRecord(modelName, recordId, params) {
    let storeRecord = this.peekRecord(modelName, recordId);
    if (!isEmpty(storeRecord)) {
      return storeRecord;
    }
    return await this.queryRecord(modelName, recordId, params);
  }

  async query(modelName, params) {
    try {
      let response = await this.adapterFor(modelName).query(modelName, params);
      let records = this.serializerFor(modelName).normalize(response.data, response.included);
      let storeRecords = this.pushAll(modelName, records);
      storeRecords.meta = this.serializerFor(modelName).normalizeMeta(response.meta);
      return storeRecords;
    } catch (e) {
      throw JsonApiError.format(e);
    }
  }

  async queryRecord(modelName, recordId, params) {
    try {
      let response = await this.adapterFor(modelName).queryRecord(modelName, recordId, params);
      let record = this.serializerFor(modelName).normalize(response.data, response.included);
      return this.pushRecord(modelName, record);
    } catch (e) {
      throw JsonApiError.format(e);
    }
  }
}

const StoreSingleton = (...props) => {
  if (!StoreInstance) {
    StoreInstance = new Store(...props);
  }
  return StoreInstance;
}

export default StoreSingleton;
