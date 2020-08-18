import React from 'react';
import Pluralize from 'pluralize';
import Axios from 'axios';

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
			let data = this.store.serializerFor(this.type).serialize(this);
			let response = this.id ? await this.update(data) : await this.create(data);
			let formattedResponse = this.store.serializerFor(this.type).normalize(response.data, response.included, response.meta);
			this.updateProps(formattedResponse);
			return formattedResponse;
		} catch(e) {
			throw e;
		}
	}

	async create(data) {
		try {
			let url = this.store.adapterFor(this.type).urlForCreateRecord(this.type);
			let response = await Axios.post(url, data);
			return response.data;
		} catch(e) {
			throw e;
		}
	}

	async update(data) {
		try {
			let url = this.store.adapterFor(this.type).urlForUpdateRecord(this.type, this.id);
			let response = await Axios.put(url, data);
			return response.data;
		} catch(e) {
			throw e;
		}
	}

	async destroy() {
		try {
			let url = this.store.adapterFor(this.type).urlForDestroyRecord(this.type, this.id);
			let response = await Axios.delete(url);
			let formattedResponse = this.store.serializerFor(this.type).normalize(response.data, response.included, response.meta);
			this.store.removeRecord(this.type, this);
			return this;
		} catch(e) {
			throw e;
		}
	}

}

export default AppModel;