import React from 'react';
import Pluralize from 'pluralize';

import { camelToDash, dashToCamel } from 'utils/transforms';
import { isEmpty, logger } from 'utils/helpers';

class BaseSerializer {
	constructor(store, props = {}) {
		this.store = store || {};
	}

	get attrs() {
		return {
			type: { serialize: false },
			className: { serialize: false },
			parent: { serialize: false },
			store: { serialize: false },
			log: { serialize: false },
			updatedAt: { serialize: false },
			createdAt: { serialize: false },
		}
	}

	get relationships() {
		return {}
	}

	// Methods
	checkAttrs(key) {
		let keys = Object.keys(this.attrs);
		return keys.includes(key) ? this.attrs[key] : {};
	}

	checkRelationships(key) {
		let keys = Object.keys(this.relationships);
		return keys.includes(key) ? this.relationships[key] : {};
	}


	// Serialize
	serialize(data) {
		let formattedData = this.serializeAttrs(data);
		logger('formattedData: ', formattedData);
		return { data: { attributes: formattedData }};
	}

	serializeAttrs(data) {
		let formattedData = {};
		Object.keys(data).forEach(key => {
			formattedData[camelToDash(key)] = this.serializeAttr(data, key);
		});
		return formattedData;
	}

	serializeAttr(data, key) {
		if (this.checkAttrs(key).serialize == false) { 
			return; 
		}
		if (key == 'id') {
			return parseInt(data[key])
		}
		if (Array.isArray(data[key]))  {
			if (isEmpty(data[key])) { return null }
			if(typeof data[key][0] == 'object') {
				return this.serializeRelationships(data, key);
			}
			return JSON.stringify(data[key]);
		}
		if (typeof data[key] == 'object') {
			if (isEmpty(data[key])) { return null }
			return this.serializeRelationship(data, key);
		}
		return data[key];
	}

	serializeRelationships(data, key) {
		let formattedData = [];
		data[key].forEach(relation => {
			if (this.checkRelationships(key).serialize == true) {
				formattedData.push(this.serializeAttrs(relation));
			}
			if (this.checkRelationships(key).serialize == 'id') {
				formattedData.push({ id: parseInt(relation.id) });
			}
		});
		return formattedData;
	}

	serializeRelationship(data, key) {
		if (isEmpty(data[key])) { return; }

		if (this.checkRelationships(key).serialize == true) {
			return this.serializeAttrs(data[key]);
		}
		if (this.checkRelationships(key).serialize == 'id') {
			return { id: parseInt(data[key].id) };
		}
	}

	
	// Normalize
	normalizeArray(data = [], included = [], meta = {}) {
		let normalizedData = [];
		data.map(record => normalizedData.push(this.normalize(record, included)));
		logger('normalizedData: ', normalizedData);
		return { records: normalizedData, meta: this.normalizeAttrs(meta) };
	}

	normalize(data, included = [], meta) {
		let normalizedData = this.normalizeAttrs(data, included);
		logger('normalizedData: ', normalizedData);
		return normalizedData;
	}

	normalizeAttrs(data, included = []) {
		let normalizedAttrs = {};
		if (isEmpty(data)) { return; }
		Object.keys(data).forEach(key => {
			if (typeof data[key] == 'object') {
				if (key == 'attributes') {
					return Object.assign(normalizedAttrs, this.normalizeAttrs(data[key], included));
				}
				if (key == 'relationships') {
					return Object.assign(normalizedAttrs, this.normalizeRelationships(data[key], included));
				}
				return normalizedAttrs[dashToCamel(key)] = this.normalizeAttrs(data[key], key);
			}
			return normalizedAttrs[dashToCamel(key)] = this.normalizeAttr(data, key);
		});
		return normalizedAttrs;
	}

	normalizeAttr(data, key) {
		return data[key];
	}

	normalizeRelationships(data, included) {
		let formattedRelationships = {};
		if (isEmpty(data)) { return; }

		Object.keys(data).forEach(key => {
			let relationshipData = data[key].data;
			if (isEmpty(relationshipData)) { return; }

			if (Array.isArray(relationshipData)) {
				return formattedRelationships[dashToCamel(key)] = relationshipData.map(relationship => this.normalizeRelationship(relationship, included));
			}
			if (typeof relationshipData == 'object') {
				return formattedRelationships[dashToCamel(key)] = this.normalizeRelationship(relationshipData, included);
			}
			return formattedRelationships[dashToCamel(key)] = this.normalizeRelationship(relationshipData, included);
		});
		return formattedRelationships;
	}

	normalizeRelationship(relationship, included) {
		let include = included.find(include => include.type == relationship.type && include.id == relationship.id);
		return !isEmpty(include) ? this.normalizeAttrs(include) : {};
	}

}

export default BaseSerializer;