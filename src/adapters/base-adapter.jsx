import 'cross-fetch/polyfill';
import Pluralize from 'pluralize';
import { isEmpty } from 'utils/helpers';

class BaseAdapter {
  static apiDomain = '';
  static token = '';

  // Methods
  static fetch(...params) {
    return fetch(...params);
  }

  static headers() {
    let headers = {};
    headers['Content-Type'] = 'application/json';
    if (this.token) {
      headers['Authorization'] = this.token;
    }
    return headers;
  };

  static options(method, data) {
    let options = {};
    options['method'] = method;
    options['headers'] = this.headers();
    options['body'] = JSON.stringify(data);
    return options;
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

  static formatParams(params = {}) {
    let formattedParams = '';
    Object.keys(params).forEach((key, index) => {
      if (!isEmpty(params[key])) {
        formattedParams = formattedParams.concat(`${key}=${params[key].toString()}`);
        formattedParams = index < Object.keys(params).length - 1 ? formattedParams.concat('&') : formattedParams;
      }
    });
    return formattedParams;
  }

  static formatUrl(url, params) {
    return params ? url.concat(`?${params}`) : url;
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
    let url = this.urlForQuery(modelName);
    let formattedParams = this.formatParams(params);
    let formattedUrl = this.formatUrl(url, formattedParams);
    let response = await this.fetch(formattedUrl, this.options('GET'));
    // if response is not 200, throw error
    return await response.json();
  }

  static async queryRecord(modelName, recordId = null, params = {}) {
    let url = this.urlForQueryRecord(modelName, recordId);
    let formattedParams = this.formatParams(params);
    let formattedUrl = this.formatUrl(url, formattedParams);
    let response = await this.fetch(formattedUrl,this.options('GET'));
    return await response.json();
  }

  static async createRecord(modelName, data, params) {
    let url = this.urlForCreateRecord(modelName);
    let formattedParams = this.formatParams(params);
    let formattedUrl = this.formatUrl(url, formattedParams);
    let response = await this.fetch(formattedUrl, this.options('POST', data));
    return await response.json();
  }

  static async updateRecord(modelName, recordId, data, params) {
    let url = this.urlForUpdateRecord(modelName, recordId);
    let formattedParams = this.formatParams(params);
    let formattedUrl = this.formatUrl(url, formattedParams);
    let response = await this.fetch(formattedUrl, this.options('PUT', data));
    return await response.json();
  }

  static async destroyRecord(modelName, recordId, params) {
    let url = this.urlForDestroyRecord(modelName, recordId);
    let formattedParams = this.formatParams(params);
    let formattedUrl = this.formatUrl(url, formattedParams);
    let response = await this.fetch(formattedUrl, this.options('DELETE'));
    return await response.json();
  }
}

export default BaseAdapter;
