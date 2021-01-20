import 'cross-fetch/polyfill';
import Pluralize from 'pluralize';
import { isEmpty } from 'utils/helpers';

class BaseAdapter {
  static apiDomain = '';
  static token = '';


  // Methods
  static get(prop) {
    return this[prop];
  }

  static set(prop, value) {
    return this[prop] = value;
  }

  static async networkCall(...args) {
    let response = await fetch(...args)
    if (!response.ok) throw await response.json();
    return await response.json();
  }

  static options(method, data) {
    let options = {};
    options['method'] = method;
    options['headers'] = this.headers();
    options['body'] = JSON.stringify(data);
    return options;
  }

  static headers() {
    let headers = {};
    headers['Content-Type'] = 'application/json';
    if (this.token) {
      headers['Authorization'] = this.token;
    }
    return headers;
  };

  static baseURL() {
    return this.apiDomain;
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

  static formatURL(url, params) {
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
    let formattedUrl = this.formatURL(url, formattedParams);
    return await this.networkCall(formattedUrl, this.options('GET'));
  }

  static async queryRecord(modelName, recordId, params = {}) {
    let url = this.urlForQueryRecord(modelName, recordId);
    let formattedParams = this.formatParams(params);
    let formattedUrl = this.formatURL(url, formattedParams);
    return await this.networkCall(formattedUrl,this.options('GET'));
  }

  static async createRecord(modelName, data, params) {
    let url = this.urlForCreateRecord(modelName);
    let formattedParams = this.formatParams(params);
    let formattedUrl = this.formatURL(url, formattedParams);
    return await this.networkCall(formattedUrl, this.options('POST', data));
  }

  static async updateRecord(modelName, recordId, data, params) {
    let url = this.urlForUpdateRecord(modelName, recordId);
    let formattedParams = this.formatParams(params);
    let formattedUrl = this.formatURL(url, formattedParams);
    return await this.networkCall(formattedUrl, this.options('PUT', data));
  }

  static async destroyRecord(modelName, recordId, params) {
    let url = this.urlForDestroyRecord(modelName, recordId);
    let formattedParams = this.formatParams(params);
    let formattedUrl = this.formatURL(url, formattedParams);
    return await this.networkCall(formattedUrl, this.options('DELETE'));
  }
}

export default BaseAdapter;
