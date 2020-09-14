import React, { Component } from 'react';
import AppAdapter from 'adapters/app';

import adapterFor from 'helpers/adapter-for';
import serializerFor from 'helpers/serializer-for';
import modelFor from 'helpers/model-for';

import JsonApiErrors from 'utils/json-api-errors';
import { addObject, removeObject, timeElapsed, logger, isEmpty } from 'utils/helpers';

export const Store = React.createContext();

class StoreContext extends Component {
  constructor(props) {
    super(props);
    this.state = {
      apiDomain: this.props.apiDomain || '',
      adapterFor: this.adapterFor.bind(this),
      modelFor: this.modelFor.bind(this),
      serializerFor: this.serializerFor.bind(this),
      createRecord: this.createRecord.bind(this),
      pushAll: this.pushAll.bind(this),
      pushRecord: this.pushRecord.bind(this),
      peekAll: this.peekAll.bind(this),
      peekRecord: this.peekRecord.bind(this),
      peekOrCreateRecord: this.peekOrCreateRecord.bind(this),
      updateRecord: this.updateRecord.bind(this),
      updateStore: this.updateStore.bind(this),
      findAll: this.findAll.bind(this),
      findRecord: this.findRecord.bind(this),
      query: this.query.bind(this),
      queryRecord: this.queryRecord.bind(this),
      apiRequest: this.apiRequest.bind(this),
      removeAll: this.removeAll.bind(this),
      removeRecord: this.removeRecord.bind(this),
      isLoaded: true,
    };
  };

  
  // Hooks
  componentDidMount() {
    this.init();
  }

  init() {
    let start = Date.now();
    this.adapterFor('').then(adapter => {
      adapter.set('apiDomain', this.state.apiDomain);
      console.log('ApiDomain: ', adapter.get('apiDomain'));
      this.setState({ isLoaded: true });
      timeElapsed('init: ', start);
    });
  }

  
  // Helpers
  adapterFor(modelName) {
    let start = Date.now();
    return adapterFor(modelName, this.state).then(adapter => {
      timeElapsed('AdapterFor: ', start);
      return adapter;
    });
  }

  modelFor(modelName, data) {
    let start = Date.now();
    return modelFor(modelName, this.state, data).then(model => {
      timeElapsed('modelFor: ', start);
      return model;
    });
  }

  serializerFor(modelName, data) {
    let start = Date.now();
    return serializerFor(modelName, this.state, data).then(serializer => {
      timeElapsed('serializerFor: ', start);
      return serializer;
    });
  }


  // Records
  async createRecord(modelName, data) {
    let record = await modelFor(modelName, this.state, data);
    return this.pushRecord(modelName, record);
  }

  async updateRecord(modelName, storeRecord, record) {
    const state = this.state;
    this.removeRecord(modelName, storeRecord);
    let newRecord = await this.createRecord(modelName, record);
    return newRecord;
  }

  updateStore(modelName) {
    const state = this.state;
    let models = this.state[modelName] || [];
    this.setState({ [modelName]:  models });
    logger('Store: ', this.state);
    return true;
  }


  // Peeks
  peekAll(modelName) {
    let models = this.state[modelName] || [];
    return models;
  }

  peekRecord(modelName, recordID) {
    let models = this.state[modelName] || [];
    let storeRecord = models.find(model => model.id == recordID);
    return storeRecord ? storeRecord : {};
  }

  async peekOrCreateRecord(modelName, record) {
    let models = this.state[modelName] || [];
    let storeRecord = this.peekRecord(modelName, record.id);
    return storeRecord ? storeRecord : await this.createRecord(modelName, record);
  }

  // Misc
  async pushAll(modelName, records) {
    const state = this.state;
    let models = this.state[modelName] || [];
    let newRecords = records.map(async record => {
      let storeRecord = this.peekRecord(modelName, record.id);
      if (storeRecord) {
        return await this.updateRecord(modelName, storeRecord, record)
      }
      return await this.createRecord(modelName, record);
    });
    return await Promise.all(newRecords);
  };

  pushRecord(modelName, record) {
    const state = this.state;
    let models = this.state[modelName] || [];
    models.push(record);
    this.setState({ [modelName]:  models });
    logger('Store: ', this.state);
    return record;
  };

  removeAll(modelName, records) {
    const state = this.state;
    state[modelName] = [];
    this.setState(state);
    logger('Store: ', state);
    return null;
  };

  removeRecord(modelName, record) {
    const state = this.state;
    let models = state[modelName] || [];
    let model = models.find(model => model.id == record.id);
    models = removeObject(models, model);
    this.setState(state);
    logger('Store: ', this.state);
    return null;
  };

  async findAll(modelName, params) {
    try {
      let storeRecords = this.state[modelName] || [];
      if(!isEmpty(storeRecords)) {
        return storeRecords;
      }
      // Fetch All
      let response = await this.adapterFor(modelName).then(adapter => adapter.findAll(modelName, params));
      let records = await this.serializerFor(modelName).then(serializer => serializer.normalizeArray(response.data, response.included, response.meta));
      let models = await this.pushAll(modelName, records.records);
      models.meta = records.meta;
      logger('Store: ', this.state);
      return models;
    } catch(e) {
      throw JsonApiErrors.formatErrors(e);
    }
  };

  async findRecord(modelName, recordID, params) {
    try {
      let storeRecord = this.peekRecord(modelName, recordID);
      if(storeRecord) {
        return storeRecord;
      }
      // Fetch Record
      let response = await this.adapterFor(modelName).then(adapter => adapter.findRecord(modelName, recordID, params));
      let record = await this.serializerFor(modelName).then(serializer => serializer.normalize(response.data, response.included));
      let model = await this.createRecord(modelName, record);
      logger('Store: ', this.state);
      return model;
    } catch(e) {
      throw JsonApiErrors.formatErrors(e);
    }
  };

  async query(modelName, params) {
    try {
      let start = Date.now();
      let response = await this.adapterFor(modelName).then(adapter => adapter.query(modelName, params));
      timeElapsed('Query Adaption: ', start);
      start = Date.now();
      let records = await this.serializerFor(modelName).then(serializer => serializer.normalizeArray(response.data, response.included, response.meta));
      timeElapsed('Query Serialization: ', start);
      start = Date.now();
      let models = await this.pushAll(modelName, records.records);
      models.meta = records.meta;
      timeElapsed('Query Modeling: ', start);
      logger('Store: ', this.state);
      return models;
    } catch(e) {
      throw JsonApiErrors.formatErrors(e);
    }
  }

  async queryRecord(modelName, recordID, params) {
    try {
      let response = await this.adapterFor(modelName).then(adapter => adapter.queryRecord(modelName, recordID, params));
      let record = this.serializerFor(modelName).then(serializer => serializer.normalize(response.data, response.included));
      let storeRecord = this.peekRecord(modelName, record.id);
      let model = storeRecord ? this.updateRecord(modelName, storeRecord, record) : this.createRecord(modelName, record);
      logger('Store: ', this.state);
      return model;
    } catch(e) {
      throw JsonApiErrors.formatErrors(e);
    }
  }

  async apiRequest(modelName, recordID, params) {
    try {
      let response = await this.adapterFor(modelName).then(adapter => adapter.queryRecord(modelName, recordID, params));
      let record = this.serializerFor(modelName).then(serializer => serializer.normalize(response.data, response.included));
      logger('Server Response: ', record);
      return record;
    } catch(e) {
      throw e;
    }
  }


  // Render
  render() {
    const { isLoaded } = this.state;

    if (isLoaded) {
      return (
        <Store.Provider value={this.state}>
          {this.props.children}
        </Store.Provider>
      );
    }
    return null;
  }
};

const withStore = function(WrappedComponent) {
  return class extends Component {
    render() {
      return (
        <Store.Consumer>
          {state => <WrappedComponent store={state} {...this.props} />}
        </Store.Consumer>
      );
    }
  };
};

export { StoreContext, withStore };