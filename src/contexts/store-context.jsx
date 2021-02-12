import React, { Component } from 'react';
import { loadContext } from 'store/load-context';
import { adapterFor } from 'store/adapter-for';
import { modelFor } from 'store/model-for';
import { serializerFor } from 'store/serializer-for';
import JsonApiError from 'utils/json-api-error';
import { addObject, removeObject, replaceObject, timeElapsed, logger, isEmpty } from 'utils/helpers';

const StoreContext = React.createContext();

class StoreProvider extends Component {
  constructor(props) {
    super(props);
    this.state = {
      apiDomain: this.props.apiDomain || '',
      adapters: this.props.adapters || {},
      models: this.props.models || {},
      serializers: this.props.serializers || {},
      adapterFor: this.adapterFor.bind(this),
      modelFor: this.modelFor.bind(this),
      serializerFor: this.serializerFor.bind(this),
      createRecord: this.createRecord.bind(this),
      updateRecord: this.updateRecord.bind(this),
      pushAll: this.pushAll.bind(this),
      pushRecord: this.pushRecord.bind(this),
      peekAll: this.peekAll.bind(this),
      peekRecord: this.peekRecord.bind(this),
      peekOrCreateRecord: this.peekOrCreateRecord.bind(this),
      removeAll: this.removeAll.bind(this),
      removeRecord: this.removeRecord.bind(this),
      findAll: this.findAll.bind(this),
      findRecord: this.findRecord.bind(this),
      query: this.query.bind(this),
      queryRecord: this.queryRecord.bind(this),
    }
    adapterFor('').set('apiDomain', this.props.apiDomain);
    if(!isEmpty(this.props.data)) loadContext(this.state, this.props.data);
  }


  // Hooks
  componentDidMount() {
    logger('React Data: ', this.state);
  }


  // Helpers
  adapterFor(modelName) {
    return adapterFor(this.state.adapters, modelName);
  }

  modelFor(modelName, data) {
    return modelFor(this.state.models, modelName, this.state, data);
  }

  serializerFor(modelName) {
    return serializerFor(this.state.serializers, modelName);
  }

  // Store Records
  createRecord(modelName, data, isNew = true) {
    let storeRecords = this.peekAll(modelName);
    let newRecord = this.modelFor(modelName, data);
    storeRecords.push(newRecord);
    this.setState({ [modelName]: storeRecords }, () => isNew && logger('React Data: ', this.state));
    return newRecord;
  }

  updateRecord(modelName, record) {
    let storeRecords = this.peekAll(modelName);
    let storeRecord = this.peekRecord(modelName, record.id, record.internalId);
    let newRecord = this.createRecord(modelName, record, false);
    storeRecords = replaceObject(storeRecords, storeRecord, newRecord);
    this.setState({ [modelName]: storeRecords }, () => logger('React Data: ', this.state));
    return newRecord;
  }

  pushAll(modelName, records) {
    return records.map(record => this.pushRecord(modelName, record));
  }

  pushRecord(modelName, record) {
    let storeRecord = this.peekRecord(modelName, record.id);
    return storeRecord ? this.updateRecord(modelName, record) : this.createRecord(modelName, record, false);
  }

  peekAll(modelName) {
    return this.state[modelName] || [];
  }

  peekRecord(modelName, recordId, internalId) {
    let storeRecords = this.peekAll(modelName);
    let storeRecord = recordId ? storeRecords.find(model => model.id == recordId) : storeRecords.find(model => model.internalId == internalId);
    return storeRecord ? storeRecord : null;
  }

  peekOrCreateRecord(modelName, record) {
    let storeRecord = this.peekRecord(modelName, record.id);
    return storeRecord ? storeRecord : this.createRecord(modelName, record);
  }

  removeAll(modelName, records) {
    this.setState({ [modelName]: []}, () => logger('React Data: ', this.state));
    return null;
  }

  removeRecord(modelName, record = {}) {
    let storeRecords = this.peekAll(modelName);
    let storeRecord = this.peekRecord(modelName, null, record.internalId);
    storeRecords = removeObject(storeRecords, storeRecord);
    this.setState({ [modelName]: storeRecords }, () => logger('React Data: ', this.state));
    return null;
  }


  // Network calls
  async findAll(modelName, params) {
    let storeRecords = this.peekAll(modelName);
    if (!isEmpty(storeRecords)) return storeRecords;
    return await this.query(modelName, params);
  }

  async findRecord(modelName, recordId, params) {
    let storeRecord = this.peekRecord(modelName, recordId);
    if (!isEmpty(storeRecord)) return storeRecord;
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

  async $query(modelName, params) {
    try {
      let response = await this.adapterFor(modelName).query(modelName, params);
      let records = this.serializerFor(modelName).normalize(response.data, response.included);
      records.meta = this.serializerFor(modelName).normalizeMeta(response.meta);
      return records;
    } catch (e) {
      throw JsonApiError.format(e);
    }
  }

  async $queryRecord(modelName, recordId, params) {
    try {
      let response = await this.adapterFor(modelName).queryRecord(modelName, recordId, params);
      let record = this.serializerFor(modelName).normalize(response.data, response.included);
      return record;
    } catch (e) {
      throw JsonApiError.format(e);
    }
  }


  // Render
  render() {
    const { children } = this.props;
    return <StoreContext.Provider value={this.state}>{children}</StoreContext.Provider>;
  }
}

const withStore = function (WrappedComponent) {
  return (props) => (
    <StoreContext.Consumer>
      {context => <WrappedComponent store={context} {...props} />}
    </StoreContext.Consumer>
  )
};

export { StoreContext, StoreProvider, withStore };
