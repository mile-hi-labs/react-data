import { camelToDash, dashToCamel } from 'utils/transforms';
import { isEmpty, logger } from 'utils/helpers';

class BaseSerializer {
  static attrs = {
    type: { serialize: false },
    updatedAt: { serialize: false },
    createdAt: { serialize: false },
  };

  static relationships = {};


  // Methods
  static checkAttrs(key) {
    let keys = Object.keys(this.attrs);
    return keys.includes(key) ? this.attrs[key] : {};
  }

  static checkRelationships(key) {
    let keys = Object.keys(this.relationships);
    return keys.includes(key) ? this.relationships[key] : {};
  }


  // Serialize
  static serialize(data) {
    let serializedData = this.serializeAttrs(data);
    logger('serializedData: ', serializedData);
    return { data: { attributes: serializedData } };
  }

  static serializeAttrs(data) {
    let serializedAttrs = {};
    Object.keys(data).forEach(key => {
      let attr = this.serializeAttr(data, key);
      if (attr) {
        serializedAttrs[camelToDash(key)] = attr;
      }
    });
    return serializedAttrs;
  }

  static serializeAttr(data, key) {
    if (isEmpty(data[key])) {
      return;
    }
    if (this.checkAttrs(key).serialize == false) {
      return;
    }
    if (key == 'id') {
      return parseInt(data[key]);
    }
    if (Array.isArray(data[key])) {
      if (isEmpty(data[key])) {
        return null;
      }
      if (typeof data[key][0] == 'object') {
        return this.serializeRelationships(data, key);
      }
      return JSON.stringify(data[key]);
    }
    if (typeof data[key] == 'object') {
      return this.serializeRelationship(data, key);
    }
    return data[key];
  }

  static serializeRelationships(data, key) {
    let formattedData = [];
    data[key].forEach(relation => {
      if (this.ssr) {
        formattedData.push(this.serializeAttrs(relation));
      }
      if (this.checkRelationships(key).serialize == true) {
        formattedData.push(this.serializeAttrs(relation));
      }
      if (this.checkRelationships(key).serialize == 'id') {
        formattedData.push({ id: parseInt(relation.id) });
      }
    });
    return formattedData;
  }

  static serializeRelationship(data, key) {
    if (this.ssr) {
      return this.serializeAttrs(data[key]);
    }
    if (this.checkRelationships(key).serialize == true) {
      return isEmpty(data[key]) ? null : this.serializeAttrs(data[key]);
    }
    if (this.checkRelationships(key).serialize == 'id') {
      return isEmpty(data[key]) ? null : { id: parseInt(data[key].id) };
    }
  }


  // Normalize
  static normalizeArray(data = [], included = []) {
    let normalizedData = [];
    data.forEach(record => normalizedData.push(this.normalizeAttrs(record, included)));
    logger('normalizedData: ', normalizedData);
    return normalizedData;
  }

  static normalize(data, included = []) {
    let normalizedData = this.normalizeAttrs(data, included);
    logger('normalizedData: ', normalizedData);
    return normalizedData;
  }

  static normalizeMeta(meta) {
    let normalizedMeta = {};
    Object.keys(meta).forEach(key => {
      normalizedMeta[dashToCamel(key)] = parseInt(meta[key]);
    });
    logger('normalizedMeta: ', normalizedMeta);
    return normalizedMeta;
  }

  static normalizeAttrs(data, included = []) {
    let normalizedAttrs = {};
    if (isEmpty(data)) {
      return;
    }
    Object.keys(data).forEach(key => {
      if (typeof data[key] == 'object') {
        if (key == 'attributes') {
          return Object.assign(normalizedAttrs, this.normalizeAttrs(data[key], included));
        }
        if (key == 'relationships') {
          return Object.assign(normalizedAttrs, this.normalizeRelationships(data[key], included));
        }
        return (normalizedAttrs[dashToCamel(key)] = this.normalizeAttrs(data[key], key));
      }
      return (normalizedAttrs[dashToCamel(key)] = this.normalizeAttr(data, key));
    });
    return normalizedAttrs;
  }

  static normalizeAttr(data, key) {
    return data[key];
  }

  static normalizeRelationships(data, included) {
    let formattedRelationships = {};
    if (isEmpty(data)) {
      return;
    }

    Object.keys(data).forEach(key => {
      let relationshipData = data[key].data;
      if (isEmpty(relationshipData)) return;

      if (Array.isArray(relationshipData)) {
        return (formattedRelationships[dashToCamel(key)] = relationshipData.map(relationship => this.normalizeRelationship(relationship, included)));
      }
      if (typeof relationshipData == 'object') {
        return (formattedRelationships[dashToCamel(key)] = this.normalizeRelationship(relationshipData, included));
      }
      return (formattedRelationships[dashToCamel(key)] = this.normalizeRelationship(relationshipData, included));
    });
    return formattedRelationships;
  }

  static normalizeRelationship(relationship, included) {
    let include = included.find(include => include.type == relationship.type && include.id == relationship.id);
    return !isEmpty(include) ? this.normalizeAttrs(include) : {};
  }
}

export default BaseSerializer;
