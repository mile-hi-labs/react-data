import React from 'react';
import Pluralize from 'pluralize';

import { camelToDash, dashToCamel, phoneToString } from 'utils/transforms';
import { isEmpty } from 'utils/helpers';

class AppSerializer {
	constructor(store, props = {}) {
		this.store = store || {};
	}

	get attrs() {
		return {}
	}

	get globalAttrs() {
		return {
			className: false,
			type: false,
			parent: false,
			store: false,
			log: false,
			updatedAt: false,
			createdAt: false,
		}
	}

	get relationships() {
		return {}
	}

	get globalRelationships() {
		return {}
	}


	// Methods
	checkAttrs(key) {
		let attrs = {...this.attrs, ...this.globalAttrs };
		let keys = Object.keys(attrs);
		return keys.includes(key) ? attrs[key] : true;
	}

	checkRelationships(key) {
		let relationships = {...this.relationships, ...this.globalRelationships };
		let keys = Object.keys(relationships);
		return keys.includes(key) ? relationships[key] : true;
	}


	// Serialize
	serialize(data) {
		let formattedData = {};
		formattedData = this.serializeAttrs(data);
		return { data: { attributes: formattedData }};
	}

	serializeAttrs(data) {
		let formattedData = {};
		Object.keys(data).forEach(key => {
			if(isEmpty(data[key])) { 
				return; 
			}
			if(this.checkAttrs(key) == false) { 
				return; 
			}
			// Transforms
			if(Array.isArray(data[key]) &&  !isEmpty(data[key]))  {
				if(typeof data[key][0] == 'object') {
					formattedData[key] = this.serializeRelationships(data, key);
					return
				}
				formattedData[camelToDash(key)] = JSON.stringify(data[key]);
				return
			}
			if(typeof data[key] == 'object' && !isEmpty(data[key])) {
				Object.assign(formattedData, this.serializeRelationship(data, key));
				return
			}
			formattedData[camelToDash(key)] = data[key];
			return;
		});
		return formattedData;
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
		let formattedData = {};
		if (this.checkRelationships(key).serialize == true) {
			formattedData[camelToDash(key)] = this.serializeAttrs(data[key]);
		}
		if (this.checkRelationships(key).serialize == 'id') {
			formattedData[camelToDash(key)] = { id: parseInt(data[key].id) };
		}
		if (!data[key].type) {
			formattedData[camelToDash(key)] = this.serializeAttrs(data[key]);
		}
		return formattedData;
	}

	
	// Normalize
	normalizeArray(data, included = [], meta = {}) {
		let formattedArray = [];
		if (isEmpty(data)) { return  { records: formattedArray, meta: this.normalizeAttributes(meta) } };

		data.map(record => {
			let formattedData = {};
			let keys = this.normalizeAttributes(record, included);
			
			Object.keys(keys).forEach(key => {
				formattedData[dashToCamel(key)] = keys[key]
			});
			return formattedArray.push(formattedData);
		});
		return { records: formattedArray, meta: this.normalizeAttributes(meta) };
	}

	normalize(data, included = []) {
		let formattedData = {};
		if (isEmpty(data)) { return formattedData }

		let keys = this.normalizeAttributes(data, included);

		Object.keys(keys).forEach(key => {
			formattedData[dashToCamel(key)] = keys[key]
		});

		return formattedData;
	}

	normalizeAttributes(data, included) {
		let formattedData = {};
		Object.keys(data).forEach(key => {
			if(isEmpty(data[key])) { return }
			
			if(key =='id') {
				formattedData[key] = data[key] // Does this need parseInt?? (merchant relies on string currently)
				return;
			}	
			if(key == 'type') {
				formattedData[key] = data[key];
				return;
			}
			if(key.includes('date')) {
				formattedData[dashToCamel(key)] = moment(data[key]);
				return;
			}
			if(key.includes('score')) {
				formattedData[camelToDash(key)] = parseFloat(data[key]);
				return;
			}
			if(Array.isArray(data[key]))  {
				formattedData[dashToCamel(key)] = data[key];
				return
			}
			if(typeof data[key] == 'object') {
				if (key == 'attributes') {
					Object.assign(formattedData, this.normalizeAttributes(data[key]));
					return;
				} else if (key == 'relationships') {
					Object.assign(formattedData, this.normalizeRelationships(data[key], included));
					return;
				} else {
					formattedData[dashToCamel(key)] = this.normalizeAttributes(data[key]);
					return;
				}
			}
			formattedData[dashToCamel(key)] = data[key];
			return;
		});
		return formattedData;
	}

	normalizeRelationships(data, included) {
		let formattedData = {};

		Object.keys(data).forEach(key => {
			let relationData = {};
			
			if(isEmpty(data[key].data)) { return }
			
			if(Array.isArray(data[key].data))  {
				formattedData[dashToCamel(key)] = this.normalizeRelationshipArray(data[key].data, included);
				return
			}
			if(typeof data[key].data == 'object') {
				relationData['id'] = data[key].data.id;
				relationData['type'] = data[key].data.type;

				let include = included.find(include => include.type === relationData.type && include.id === relationData.id);

				if(!isEmpty(include)) {
					formattedData[dashToCamel(key)] = this.normalizeAttributes(include);
					return;
				}
				formattedData[dashToCamel(key)] = relationData;
				return;
			}
		});
		return formattedData;
	}

	normalizeRelationshipArray(data, included) {
		let formattedArray = [];

		data.forEach(data => {
			let formattedData = {};

			formattedData['id'] = data.id;
			formattedData['type'] = data.type;

			let include = included.find(include => include.type === formattedData.type && include.id === formattedData.id);

			if(!isEmpty(include)) {
				formattedArray.push(this.normalizeAttributes(include));
				return
			}
			formattedArray.push(formattedData);
			return
		});
		return formattedArray;
	}

}

export default AppSerializer;