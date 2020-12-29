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

	static baseURL() {
		return this.apiDomain;
	}


	static buildURL(modelName, id) {
		if (id) {
			return this.baseURL() + `/${modelName}/${id}`;
		}
		return this.baseURL() + `/${modelName}`;
	}

	static formattedParams(params = {}) {
		let formattedParams = {};
		Object.keys(params).forEach(p => {
			if (!isEmpty(params[p])) { formattedParams[p] = params[p]; }
		});
		return formattedParams;
	}


	// URLs
	static urlForQuery(modelName) {
		let resourceName = Pluralize(modelName);
		return this.buildURL(resourceName);
	}

	static urlForQueryRecord(modelName, id = '') {
		let resourceName = Pluralize(modelName);
		return this.buildURL(resourceName, id.toString());
	}

	static urlForCreateRecord(modelName) {
		let resourceName = Pluralize(modelName);
		return this.buildURL(resourceName);
	}

	static urlForUpdateRecord(modelName, id = '') {
		let resourceName = Pluralize(modelName);
		return this.buildURL(resourceName, id.toString());
	}

	static urlForDestroyRecord(modelName, id = '') {
		let resourceName = Pluralize(modelName);
		return this.buildURL(resourceName, id.toString());
	}


	// Network calls
	static async query(modelName, params) {
		try {
			let url = this.urlForQuery(modelName);
			let formattedParams = this.formattedParams(params);
			let response = await this.axios.get(url, { params: formattedParams });
			return response.data;
		} catch(e) {
			throw e;
		}
	}

	static async queryRecord(modelName, recordId = null, params = {}) {
		try {
			let url = this.urlForQueryRecord(modelName, recordId);
			let formattedParams = this.filteredParams(params);
			let response = await this.axios.get(url, { params: formattedParams });
			return response.data;
		} catch(e) {
			throw e;
		}
	}
}

export default BaseAdapter;
