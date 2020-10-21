import React from 'react';
import Pluralize from 'pluralize';

import { camelToDash, dashToCamel, phoneToString } from 'utils/transforms';
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
		return { data: { attributes: formattedData }};
	}

	serializeAttrs(data) {
		let formattedData = {};
		Object.keys(data).forEach(key => {
			if (isEmpty(data[key])) { return; }
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
			if(typeof data[key][0] == 'object') {
				return this.serializeRelationships(data, key);
			}
			return JSON.stringify(data[key]);
		}
		if (typeof data[key] == 'object') {
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
			if (!relation.type) {
				formattedData.push(this.serializeAttrs(relation));
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
		return this.serializeAttrs(data[key]);
	}

	
	// Normalize
	normalizeArray(data = [], included = [], meta = {}) {
		let formattedArray = [];
		if (isEmpty(data)) { return  { records: formattedArray, meta: this.normalizeAttrs(meta) } };

		data.map(record => {
			let formattedData = this.normalize(record, included);
			return formattedArray.push(formattedData);
		});
		return { records: formattedArray, meta: this.normalizeAttrs(meta) };
	}

	normalize(data, included = [], meta) {
		let formattedData = this.normalizeAttrs(data, included);
		return formattedData;
	}

	normalizeAttrs(data, included = []) {
		let formattedData = {};
		if (isEmpty(data)) { return; }
		Object.keys(data).forEach(key => {
			if (typeof data[key] == 'object') {
				if (key == 'attributes') {
					return Object.assign(formattedData, this.normalizeAttrs(data[key], included));
				}
				if (key == 'relationships') {
					return Object.assign(formattedData, this.normalizeRelationships(data[key], included));
				}
			}
			return formattedData[dashToCamel(key)] = this.normalizeAttr(data, key);
		});
		return formattedData;
	}

	normalizeAttr(data, key) {
		return data[key];
	}

	normalizeRelationships(data, included) {
		let formattedRelationships = {};
		if (isEmpty(data)) { return; }

		Object.keys(data).forEach(key => {
			let relationshipData = data[key].data;

			if (Array.isArray(relationshipData)) {
				return formattedRelationships[dashToCamel(key)] = relationshipData.map(relationship => this.normalizeRelationship(relationship, included));
			}
			if (typeof relationshipData == 'object') {
				return formattedRelationships[dashToCamel(key)] = this.normalizeRelationship(relationshipData, included);
			}
		});
		logger('normalizedRelations: ', formattedRelationships);
		return formattedRelationships;
	}

	normalizeRelationship(relationship, included) {
		let include = included.find(include => include.type == relationship.type && include.id == relationship.id);
		return !isEmpty(include) ? this.normalizeAttrs(include) : {};
	}

}

export default BaseSerializer;