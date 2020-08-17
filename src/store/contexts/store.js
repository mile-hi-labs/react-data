import React, { Component } from 'react';
import AppAdapter from 'store/adapters/app';

import adapterFor from 'store/helpers/adapter-for';
import serializerFor from 'store/helpers/serializer-for';
import modelFor from 'store/helpers/model-for';

import JsonApiErrors from 'store/utils/json-api-errors';
import { addObject, removeObject, timeElapsed, isEmpty } from 'store/utils/helpers';
import DevLogger from 'store/utils/dev-logger';

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
    // this.adapterFor('').then(adapter => {
    //   adapter.set('apiDomain', this.state.apiDomain);
    //   console.log('apiDomain: ', adapter.get('apiDomain'));
    //   this.setState({ isLoaded: true });
    // });
  }

  
  // Helpers
  async adapterFor(modelName) {
    return adapterFor(modelName, this.state).then(adapter => {
      adapter.set('apiDomain', this.state.apiDomain);
      console.log('apiDomain: ', adapter.get('apiDomain'));
      return adapter;
    });
  }

  modelFor(modelName, data) {
    return modelFor(modelName, this.state, data);
  }

  serializerFor(modelName, data) {
    return serializerFor(modelName, this.state, data);
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

  peekOrCreateRecord(modelName, record) {
    let models = this.state[modelName] || [];
    let storeRecord = this.peekRecord(modelName, record.id);
    return storeRecord ? storeRecord : this.createRecord(modelName, record);
  }

  createRecord(modelName, data) {
    let record = modelFor(modelName, this.state, data);
    return this.pushRecord(modelName, record);
  }

  updateRecord(modelName, storeRecord, record) {
    const state = this.state;
    this.removeRecord(modelName, storeRecord);
    let newRecord = this.createRecord(modelName, record);
    return newRecord;
  }

  updateStore(modelName) {
    const state = this.state;
    let models = this.state[modelName] || [];
    this.setState({ [modelName]:  models });
    logger('Store: ', this.state);
    return true;
  }

  pushAll(modelName, records) {
    const state = this.state;
    let models = this.state[modelName] || [];
    let newRecords = records.map(record => {
      let storeRecord = this.peekRecord(modelName, record.id);
      if (storeRecord) {
        return this.updateRecord(modelName, storeRecord, record)
      }
      return this.createRecord(modelName, record);
    });
    return newRecords;
  };

  pushRecord(modelName, record) {
    const state = this.state;
    let models = this.state[modelName] || [];
    models.push(record);
    this.setState({ [modelName]:  models });
    DevLogger('Store: ', this.state);
    return record;
  };

  async findAll(modelName, params) {
    try {
      let storeRecords = this.state[modelName] || [];
      if(!isEmpty(storeRecords)) {
        return storeRecords;
      }
      // Fetch All
      let response = await this.adapterFor(modelName).findAll(modelName, params);
      let records = this.serializerFor(modelName).normalizeArray(response.data, response.included, response.meta);
      DevLogger('Server Response: ', records);
      let models = this.pushAll(modelName, records.records);
      models.meta = records.meta;
      DevLogger('Store: ', this.state);
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
      let response = await this.adapterFor(modelName).findRecord(modelName, recordID, params);
      let record = this.serializerFor(modelName).normalize(response.data, response.included);
      DevLogger('Server Response: ', record);
      let model = this.createRecord(modelName, record);
      DevLogger('Store: ', this.state);
      return model;
    } catch(e) {
      throw JsonApiErrors.formatErrors(e);
    }
  };

  async query(modelName, params) {
    try {
      let response = await this.adapterFor(modelName).then(adapter => adapter.query(modelName, params));
      let records = await this.serializerFor(modelName).normalizeArray(response.data, response.included, response.meta);
      DevLogger('Server Response: ', records);
      let models = this.pushAll(modelName, records.records);
      models.meta = records.meta;
      DevLogger('Store: ', this.state);
      return models;
    } catch(e) {
      throw JsonApiErrors.formatErrors(e);
    }
  }

  async queryRecord(modelName, recordID, params) {
    try {
      let response = await this.adapterFor(modelName).queryRecord(modelName, recordID, params);
      let record = this.serializerFor(modelName).normalize(response.data, response.included);
      DevLogger('Server Response: ', record);
      let storeRecord = this.peekRecord(modelName, record.id);
      let model = storeRecord ? this.updateRecord(modelName, storeRecord, record) : this.createRecord(modelName, record);
      DevLogger('Store: ', this.state);
      return model;
    } catch(e) {
      throw JsonApiErrors.formatErrors(e);
    }
  }

  async apiRequest(modelName, recordID, params) {
    try {
      let response = await this.adapterFor(modelName).queryRecord(modelName, recordID, params);
      let record = this.serializerFor(modelName).normalize(response.data, response.included);
      DevLogger('Server Response: ', record);
      return record;
    } catch(e) {
      throw e;
    }
  }

  removeAll(modelName, records) {
    const state = this.state;
    state[modelName] = [];
    this.setState(state);
    DevLogger('Store: ', state);
    return null;
  };

  removeRecord(modelName, record) {
    const state = this.state;
    let models = state[modelName] || [];
    let model = models.find(model => model.id == record.id);
    models = removeObject(models, model);
    this.setState(state);
    DevLogger('Store: ', this.state);
    return null;
  };


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