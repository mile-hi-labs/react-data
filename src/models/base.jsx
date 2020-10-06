import React from 'react';
import Pluralize from 'pluralize';
import Axios from 'services/axios-service';
import JsonApiErrors from 'utils/json-api-errors';
import { camelToDash } from 'utils/transforms';
import { addObject, removeObject, logger, isEmpty } from 'utils/helpers';

class BaseModel {
	constructor(type, store, props = {}) {
		this.id = props.id || '';
		this.type = camelToDash(type).toLowerCase();

		this.updatedAt = props.updatedAt || '';
		this.createdAt = props.createdAt || '';

		this.store = store || {};
		this.log = [];
	}


	// Storage
	attr(type, prop = '') {
		switch (type) {
			case 'decimal':
				return parseFloat(prop) || 0;

			case 'integer':
				return parseInt(prop) || 0;

			case 'string':
				return String(prop) || '';

			default:
				return prop;
		}
	}


	// Methods
	get(prop, value) {
		return this[prop];
	}

	set(prop, value) {
		if (prop.includes('.')) {
			let names = prop.split('.');
			let nestedObject = this;
			names.forEach((name, index) => {
				if (names.length - 2 == index) {
					nestedObject = nestedObject[name];
				}
			});
			nestedObject[names[names.length - 1]] = value;
		} else {
			this[prop] = value;
		}
		this.store.updateStore(this.type);
		return this;
	}

	setRelation(relation, value) {
		if(!isEmpty(this[relation])) {
			return this.set([relation], value);
		}
		return this.set([relation], this.store.createRecord(relation, value));
	}

	setProps(props) {
		Object.keys(props).forEach(key => {
			if (key == 'type') { return };
			if (Array.isArray(this[key]) && !isEmpty(this[key][0]) && this[key][0].id) { return };
			if (typeof this[key] == 'object' && this[key].id) { return };
			this[key] = props[key];
		});
	}

	belongsTo(modelName, data = {}) {
		return !isEmpty(data.id) ? this.store.peekRecord(modelName, props) : data;
	}

	hasMany(modelName, data = []) {
	 	return !isEmpty(data.map(item => item.id)) ? data.map(item => this.store.peekRecord(Pluralize.singular(modelName), item)) : data;
	}


	// Network calls
	async save() {
		try {
			let data = this.store.serializerFor(this.type).serialize(this);
			let response = this.id ? await this.update(data) : await this.create(data);
			let formattedResponse = this.store.serializerFor(this.type).normalize(response.data, response.included, response.meta);
			this.setProps(formattedResponse);
			return formattedResponse;
		} catch(e) {
			throw JsonApiErrors.formatErrors(e);
		}
	}

	async create(data) {
		let adapter = this.store.adapterFor(this.type);
		let axios = new Axios({ baseURL: adapter.apiDomain, token: adapter.token }).instance;
		let url = adapter.urlForCreateRecord(this.type);
		let response = await axios.post(url, data);
		return response.data;
	}

	async update(data) {
		let adapter = this.store.adapterFor(this.type);
		let url = adapter.urlForUpdateRecord(this.type, this.id);
		let axios = new Axios({ baseURL: adapter.apiDomain, token: adapter.token }).instance;
		let response = await axios.put(url, data);
		return response.data;
	}

	async destroy() {
		try {
			if (this.id) {
				let adapter = this.store.adapterFor(this.type);
				let axios = new Axios({ baseURL: adapter.apiDomain, token: adapter.token }).instance;
				let url = adapter.urlForDestroyRecord(this.type, this.id);
				let response = await axios.delete(url);
				let formattedResponse = this.store.serializerFor(this.type).normalize(response.data, response.included, response.meta);
			}
			return this.store.removeRecord(this.type, this);
		} catch(e) {
			throw JsonApiErrors.formatErrors(e);
		}
	}

}

export default BaseModel;