import React from 'react';
import Pluralize from 'pluralize';
import Axios from 'services/axios-service';
import JsonApiErrors from 'utils/json-api-errors';
import { camelToDash } from 'utils/transforms';
import { addObject, removeObject, logger, isEmpty } from 'utils/helpers';

class AppModel {
	constructor(type, store, props = {}) {
		this.id = props.id || '';
		this.type = camelToDash(type).toLowerCase();

		this.updatedAt = props.updatedAt || '';
		this.createdAt = props.createdAt || '';

		this.store = store || {};
		this.log = [];
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

	updateProps(props) {
		Object.keys(props).forEach(key => {
			if (key == 'type') { return };
			if (Array.isArray(this[key]) && !isEmpty(this[key][0]) && this[key][0].id) { return };
			if (typeof this[key] == 'object' && this[key].id) { return };
			this[key] = props[key];
		});
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

	belongsTo(modelName, props) {
		let relationship = !isEmpty(props) ? this.store.peekOrCreateRecord(modelName, props) : {};
		return relationship;
	}

	hasMany(modelName, props) {
	 	let relationships = !isEmpty(props) ? props.map(p => this.store.peekOrCreateRecord(Pluralize.singular(modelName), p)) : [];
	 	return relationships;
	}

	push(name, value) {
		addObject(this[name], value);
		return this.store.pushRecord(this.type, this);
	}

	remove(name, value) {
		removeObject(this[name], value);
		return this.store.pushRecord(this.type, this);
	}


	// Network calls
	async save() {
		try {
			let serializer = await this.store.serializerFor(this.type);
			let data = await serializer.serialize(this);
			let response = this.id ? await this.update(data) : await this.create(data);
			let formattedResponse = serializer.normalize(response.data, response.included, response.meta);
			this.updateProps(formattedResponse);
			return formattedResponse;
		} catch(e) {
			throw JsonApiErrors.formatErrors(e);
		}
	}

	async create(data) {
		let adapter = await this.store.adapterFor(this.type);
		let axios = new Axios({ baseURL: adapter.apiDomain, token: adapter.token }).instance;
		let url = await adapter.urlForCreateRecord(this.type);
		let response = await axios.post(url, data);
		return response.data;
	}

	async update(data) {
		let adapter = await this.store.adapterFor(this.type);
		let url = await adapter.urlForUpdateRecord(this.type, this.id);
		let axios = new Axios({ baseURL: adapter.apiDomain, token: adapter.token }).instance;
		let response = await axios.put(url, data);
		return response.data;
	}

	async destroy() {
		try {
			if (this.id) {
				let adapter = await this.store.adapterFor(this.type);
				let axios = new Axios({ baseURL: adapter.apiDomain, token: adapter.token }).instance;
				let url = await adapter.urlForDestroyRecord(this.type, this.id);
				let response = await axios.delete(url);
				let serializer = await this.store.serializerFor(this.type);
				let formattedResponse = await serializer.normalize(response.data, response.included, response.meta);
			}
			return this.store.removeRecord(this.type, this);
		} catch(e) {
			throw JsonApiErrors.formatErrors(e);
		}
	}

}

export default AppModel;