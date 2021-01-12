import Pluralize from 'pluralize';
import Axios from 'services/axios-service';
import { isEmpty } from 'utils/helpers';

class BaseAdapter {
  static apiDomain = '';
  static token = '';

  // Methods
  static get axios() {
    return new Axios({ baseURL: this.apiDomain, token: this.token }).instance;
  }

  static baseURL() {
    return this.apiDomain;
  }

  static get(prop) {
    return this[prop];
  }

  static set(prop, value) {
    let adapter = this;
    let formattedProp = prop;
    if (prop.includes('.')) {
      prop.split('.').map((p, index) => {
        prop = p;
        if (index < prop.split('.').length) {
          adapter = adapter[p];
        }
      });
    }
    adapter[prop] = value;
  }

  static buildURL(resource, id) {
    if (id) {
      let formattedId = id.toString();
      return this.baseURL() + `/${resource}/${formattedId}`;
    }
    return this.baseURL() + `/${resource}`;
  }

  static formattedParams(params = {}) {
    let formattedParams = {};
    Object.keys(params).forEach(p => {
      if (!isEmpty(params[p])) {
        formattedParams[p] = params[p];
      }
    });
    return formattedParams;
  }

  // URLs
  static urlForQuery(modelName) {
    let resource = Pluralize(modelName);
    return this.buildURL(resource);
  }

  static urlForQueryRecord(modelName, id) {
    let resource = Pluralize(modelName);
    return this.buildURL(resource, id);
  }

  static urlForCreateRecord(modelName) {
    let resource = Pluralize(modelName);
    return this.buildURL(resource);
  }

  static urlForUpdateRecord(modelName, id) {
    let resource = Pluralize(modelName);
    return this.buildURL(resource, id);
  }

  static urlForDestroyRecord(modelName, id) {
    let resource = Pluralize(modelName);
    return this.buildURL(resource, id);
  }

  // Network calls
  static async query(modelName, params) {
    try {
      let url = this.urlForQuery(modelName);
      let formattedParams = this.formattedParams(params);
      let response = await this.axios.get(url, { params: formattedParams });
      return response.data;
    } catch (e) {
      throw e;
    }
  }

  static async queryRecord(modelName, recordId = null, params = {}) {
    try {
      let url = this.urlForQueryRecord(modelName, recordId);
      let formattedParams = this.formattedParams(params);
      let response = await this.axios.get(url, { params: formattedParams });
      return response.data;
    } catch (e) {
      throw e;
    }
  }
}

export default BaseAdapter;
