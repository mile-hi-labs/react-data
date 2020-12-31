import React, { Component } from 'react';
import { fetchAdapter } from 'helpers/adapters';
import { fetchModel } from 'helpers/models';
import { fetchSerializer } from 'helpers/serializers';
import JsonApiError from 'utils/json-api-error';
import { addObject, removeObject, timeElapsed, logger, isEmpty } from 'utils/helpers';

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
      updateAll: this.updateAll.bind(this),
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
    };
  };


  // Hooks
  componentDidMount() {
    this.adapterFor('').apiDomain = this.state.apiDomain;
    logger('React Data connected to:', this.state.apiDomain);
  }


  // Helpers
  adapterFor(modelName) {
    return fetchAdapter(this.state.adapters, modelName, this.state);
  }

  modelFor(modelName, data) {
    return fetchModel(this.state.models, modelName, this.state, data);
  }

  serializerFor(modelName, data) {
    return fetchSerializer(this.state.serializers, modelName, this.state, data);
  }


  // Store Records
  createRecord(modelName, data, isNew = true) {
    let storeRecords = this.peekAll(modelName);
    let storeRecord = this.modelFor(modelName, data);
    storeRecords.push(storeRecord);
    this.setState({ [modelName]:  storeRecords }, () => {
      if (isNew) { logger('Store: ', this.state) }
    });
    return storeRecord;
  }

  updateAll(modelName) {
    let storeRecords = this.peekAll(modelName);
    this.setState({ [modelName]:  storeRecords });
    logger('Store: ', this.state);
  }

  updateRecord(modelName, storeRecord, record) {
    this.removeRecord(modelName, storeRecord);
    return this.createRecord(modelName, record, false);
  }

  pushAll(modelName, records) {
    let storeRecords = this.peekAll(modelName);
    return records.map(record => this.pushRecord(modelName, record));
  };

  pushRecord(modelName, record) {
    let storeRecord = this.peekRecord(modelName, record.id);
    return storeRecord ? this.updateRecord(modelName, storeRecord, record) : this.createRecord(modelName, record, false);
  };

  peekAll(modelName) {
    return this.state[modelName] || [];
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
    let storeRecords = this.state[modelName] || [];
    let storeRecord = record.id ? this.peekRecord(modelName, record.id) : storeRecords.find(model => isEmpty(model.id));
    storeRecords = removeObject(storeRecords, storeRecord);
    this.setState({ [modelName]:  storeRecords }, () => logger('Store: ', this.state));
    return null;
  };

  removeAll(modelName, records) {
    this.state[modelName] = [];
    this.setState(this.state, () => logger('Store: ', this.state));
    return null;
  };


  // Network calls
  async findAll(modelName, params) {
    try {
      if (!isEmpty(storeRecords)) { return this.peekAll(modelName) }
      return await this.query(modelName, params);
    } catch(e) {
      throw JsonApiError.format(e);
    }
  };

  async findRecord(modelName, recordId, params) {
    try {
      if (!isEmpty(storeRecord)) { return this.peekRecord(modelName, recordId) }
      return await this.queryRecord(modelName, recordId, params);
    } catch(e) {
      throw JsonApiError.format(e);
    }
  };

  async query(modelName, params) {
    try {
      let response = await this.adapterFor(modelName).query(modelName, params);
      let records = this.serializerFor(modelName).normalizeArray(response.data, response.included);
      let storeRecords = this.pushAll(modelName, records);
      storeRecords.meta = this.serializerFor(modelName).normalizeMeta(response.meta);
      return storeRecords;
    } catch(e) {
      throw JsonApiError.format(e);
    }
  }

  async queryRecord(modelName, recordId, params) {
    try {
      let response = await this.adapterFor(modelName).queryRecord(modelName, recordId, params);
      let record = this.serializerFor(modelName).normalize(response.data, response.included);
      return this.pushRecord(modelName, record);
    } catch(e) {
      throw JsonApiError.format(e);
    }
  }


  // Render
  render() {
    const { loaded } = this.state;
    const { children } = this.props;

    return (
      <StoreContext.Provider value={this.state}>
        {children}
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

