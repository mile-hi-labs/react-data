import React from 'react';
import Pluralize from 'pluralize';
import Axios from 'axios';
import { timeout } from 'utils/helpers';

class AppAdapter {
	static API_DOMAIN = '';


	// Methods
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
		console.log('baseURL: ', this.API_DOMAIN);
		return typeof window === 'undefined' ? '' : this.API_DOMAIN;
	}

	
	static buildURL(props) {
		if(this.noFilter) {
			return this.baseURL();
		}
		if(this.userId) {
			return this.baseURL() + `/users/${String(this.userId)}`;
		}
		if(this.bookingId && this.userId) {
			return this.baseURL() + `/users/${String(this.userId)}/bookings/${String(this.bookingId)}`;
		}
		if(this.bookingId && this.providerId) {
			return this.baseURL() + `/providers/${String(this.providerId)}/bookings/${String(this.bookingId)}`;
		}
		if(this.providerId) {
			return this.baseURL() + `/providers/${String(this.providerId)}`;
		}
		return this.baseURL();
	}


	
	// URLs
	static urlForFindAll(modelName) {
		return this.buildURL() + `/${Pluralize(modelName)}`;
	}

	static urlForFindRecord(modelName, id) {
		return this.buildURL() + `/${Pluralize(modelName)}/${id}`;
	}

	static urlForQuery(modelName) {
		return this.buildURL() + `/${Pluralize(modelName)}`;
	}

	static urlForQueryRecord(modelName, id) {
		return this.buildURL() + `/${Pluralize(modelName)}/${id}`;
	}

	static urlForCreateRecord(modelName) {
		return this.buildURL() + `/${Pluralize(modelName)}`;
	}

	static urlForUpdateRecord(modelName, id) {
		return this.buildURL() + `/${Pluralize(modelName)}/${id}`;
	}

	static urlForDestroyRecord(modelName, id) {
		return this.buildURL() + `/${Pluralize(modelName)}/${id}`;
	}


	// Network calls
	static async findAll(modelName, params) {
		try {
			await timeout(300);
			let url = this.urlForFindAll(modelName);
			let axios = new Axios().instance();
			await Axios.authorize(axios);
			let response = await axios.get(url, { params });
			return response.data;
		} catch(e) {
			throw e;
		}
	}

	static async findRecord(modelName, recordID, params = {}) {
		try {
			await timeout(300);
			let url = this.urlForFindRecord(modelName, recordID);
			let axios = new Axios().instance();
			await Axios.authorize(axios);
			let response = await axios.get(url, { params });
      return response.data;
		} catch(e) {
			throw e;
		}
	}

	static async query(modelName, params) {
		try {
			await timeout(300);
			let url = this.urlForQuery(modelName);
			// await Axios.authorize(axios);
			let response = await Axios.get(url, { params });
			return response.data;
		} catch(e) {
			throw e;
		}
	}

	static async queryRecord(modelName, id = null, params = {}) {
		try {
			await timeout(300);
			let url = this.urlForQueryRecord(modelName, id);
			let axios = new Axios().instance();
			await Axios.authorize(axios);
			let response = await axios.get(url, { params });
			return response.data;
		} catch(e) {
			throw e;
		}
	}
}

export default AppAdapter;