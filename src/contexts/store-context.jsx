import React, { Component } from 'react';
import { adapterFor } from 'helpers/adapters';
import { serializerFor } from 'helpers/serializers';
import { modelFor } from 'helpers/models';
import JsonApiErrors from 'utils/json-api-errors';
import { addObject, removeObject, timeElapsed, logger, isEmpty } from 'utils/helpers';

const StoreContext = React.createContext();

class StoreProvider extends Component {
  constructor(props) {
    super(props);
    this.state = {
      adapters: this.props.adapters || {},
      models: this.props.models || {},
      serializers: this.props.serializers || {},
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
      loaded: false,
    };
  };


  // Hooks
  componentDidMount() {
    this.init();
  }


  // Setup
  async init() {
    let start = Date.now();
    logger('store initialized...');

    this.adapterFor('').set('apiDomain', this.state.apiDomain);
    this.setState({ loaded: true });

    timeElapsed('store ready: ', start);
  }


  // Helpers
  adapterFor(modelName) {
    return adapterFor(this.state.adapters, modelName, this.state);
  }

  modelFor(modelName, data) {
    return modelFor(this.state.models, modelName, this.state, data);
  }

  serializerFor(modelName, data) {
    return serializerFor(this.state.serializers, modelName, this.state, data);
  }


  // Records
  createRecord(modelName, data) {
    let record = this.modelFor(modelName, data);
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


  // Peeks
  peekAll(modelName) {
    let models = this.state[modelName] || [];
    return models;
  }

  peekRecord(modelName, recordID) {
    let models = this.state[modelName] || [];
    let storeRecord = models.find(model => model.id == recordID);
    return storeRecord ? storeRecord : null;
  }

  peekOrCreateRecord(modelName, record) {
    let models = this.state[modelName] || [];
    let storeRecord = this.peekRecord(modelName, record.id);
    return storeRecord ? this.updateRecord(modelName, storeRecord, record) : this.createRecord(modelName, record);
  }

  // Misc
  async pushAll(modelName, records) {
    const state = this.state;
    let models = this.state[modelName] || [];
    let newRecords = records.map(async record => {
      let storeRecord = this.peekRecord(modelName, record.id);
      if (storeRecord) {
        return this.updateRecord(modelName, storeRecord, record)
      }
      return this.createRecord(modelName, record);
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
    models = model ? removeObject(models, model) : removeObject(models, record);
    this.setState(state);
    logger('Store: ', this.state);
    return null;
  };

  async findAll(modelName, params) {
    try {
      let storeRecords = this.state[modelName] || [];
      if (!isEmpty(storeRecords)) { return storeRecords }
      // Fetch All
      let response = await this.adapterFor(modelName).findAll(modelName, params);
      let records = this.serializerFor(modelName).normalizeArray(response.data, response.included, response.meta);
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
      if (!isEmpty(storeRecord)) { return storeRecord }
      // Fetch Record
      let response = await this.adapterFor(modelName).findRecord(modelName, recordID, params);
      let record = this.serializerFor(modelName).normalize(response.data, response.included);
      let model = this.createRecord(modelName, record);
      logger('Store: ', this.state);
      return model;
    } catch(e) {
      throw JsonApiErrors.formatErrors(e);
    }
  };

  async query(modelName, params) {
    try {
      let start = Date.now();
      let response = await this.adapterFor(modelName).query(modelName, params);
      let records = this.serializerFor(modelName).normalizeArray(response.data, response.included, response.meta);
      let models = await this.pushAll(modelName, records.records);
      models.meta = records.meta;
      return models;
    } catch(e) {
      throw JsonApiErrors.formatErrors(e);
    }
  }

  async queryRecord(modelName, recordID, params) {
    try {
      let response = await this.adapterFor(modelName).queryRecord(modelName, recordID, params);
      let record = this.serializerFor(modelName).normalize(response.data, response.included);
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
      let response = await this.adapterFor(modelName).queryRecord(modelName, recordID, params);
      let record = this.serializerFor(modelName).normalize(response.data, response.included);
      logger('Server Response: ', record);
      return record;
    } catch(e) {
      throw e;
    }
  }


  // Render
  render() {
    const { loaded } = this.state;
    const { children } = this.props;

    return (
      <StoreContext.Provider value={this.state}>
        {loaded ? children : null}
      </StoreContext.Provider>
    );
  }
};

const withStore = function(WrappedFunction) {
  return class extends Component {
    render() {
      return (
        <StoreContext.Consumer>
          {context => <WrappedFunction store={context} {...this.props} />}
        </StoreContext.Consumer>
      )
    }
  }
}

export { StoreContext, StoreProvider, withStore };

