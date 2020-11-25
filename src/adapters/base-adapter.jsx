import React from 'react';
import Pluralize from 'pluralize';
import Axios from 'services/axios-service';
import { isEmpty } from 'utils/helpers';

class BaseAdapter {
	static apiDomain = '';
	static token = '';


	// Methods
	static get axios() {
		return new Axios({ baseURL: this.apiDomain, token: this.token }).instance
	}

	static get(prop, value) {
		return this[prop];
	}

	static set(prop, value) {
		if(prop.includes('.')) {
			let names = prop.split('.');
			this[names[0]][names[1]] = value;
		} else {
			this[prop] = value;
		}
		return this;
	}

	static baseURL() {
		return typeof window == 'undefined' ? '' : this.apiDomain;
	}


	static buildURL(modelName, id) {
		if (id) {
			return this.baseURL() + `/${Pluralize(modelName)}/${String(id)}`;
		}
		return this.baseURL() + `/${Pluralize(modelName)}`;
	}

	static filteredParams(params = {}) {
		let formattedParams = {};
		Object.keys(params).forEach(p => {
			if (!isEmpty(params[p])) { formattedParams[p] = params[p]; }
		});
		return formattedParams;
	}


	// URLs
	static urlForFindAll(modelName) {
		return this.buildURL(modelName);
	}

	static urlForFindRecord(modelName, id) {
		return this.buildURL(modelName, id);
	}

	static urlForQuery(modelName) {
		return this.buildURL(modelName);
	}

	static urlForQueryRecord(modelName, id) {
		return this.buildURL(modelName, id);
	}

	static urlForCreateRecord(modelName) {
		return this.buildURL(modelName);
	}

	static urlForUpdateRecord(modelName, id) {
		return this.buildURL(modelName, id);
	}

	static urlForDestroyRecord(modelName, id) {
		return this.buildURL(modelName, id);
	}


	// Network calls
	static async findAll(modelName, params) {
		try {
			let url = this.urlForFindAll(modelName);
			let formattedParams = this.filteredParams(params);
			let response = await this.axios.get(url, { params: formattedParams });
			return response.data;
		} catch(e) {
			throw e;
		}
	}

	static async findRecord(modelName, recordID, params = {}) {
		try {
			let url = this.urlForFindRecord(modelName, recordID);
			let formattedParams = this.filteredParams(params);
			let response = await this.axios.get(url, { params: formattedParams });
      return response.data;
		} catch(e) {
			throw e;
		}
	}

	static async query(modelName, params) {
		try {
			let url = this.urlForQuery(modelName);
			let formattedParams = this.filteredParams(params);
			let response = await this.axios.get(url, { params: formattedParams });
			return response.data;
		} catch(e) {
			throw e;
		}
	}

	static async queryRecord(modelName, id = null, params = {}) {
		try {
			let url = this.urlForQueryRecord(modelName, id);
			let formattedParams = this.filteredParams(params);
			let response = await this.axios.get(url, { params: formattedParams });
			return response.data;
		} catch(e) {
			throw e;
		}
	}
}

export default BaseAdapter;
