import { camelToDash, dashToCamel } from 'utils/transforms';
import { isEmpty, logger } from 'utils/helpers';

class BaseSerializer {
  static attrs = {};

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
    let serializedData;
    if (Array.isArray(data)) {
      serializedData = [];
      data.forEach(record => serializedData.push(this.serializeAttrs(record)));
    } else {
      serializedData = {};
      Object.assign(serializedData, this.serializeAttrs(data));
    }
    logger('serializedData: ', serializedData);
    return serializedData;
  }

  static serializeAttrs(data) {
    let serializedAttrs = {};
    Object.keys(data).forEach(key => {
      let attr = this.serializeAttr(data, key);
      if (attr) serializedAttrs[camelToDash(key)] = attr;
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
    if (this.checkRelationships(key).serialize == true) {
      return isEmpty(data[key]) ? null : this.serializeAttrs(data[key]);
    }
    if (this.checkRelationships(key).serialize == 'id') {
      return isEmpty(data[key]) ? null : { id: parseInt(data[key].id) };
    }
  }


  // Normalize
  static normalize(data, included = []) {
    let normalizedData;
    if (Array.isArray(data)) {
      normalizedData = [];
      data.forEach(record => normalizedData.push(this.normalizeAttrs(record, included)));
    } else {
      normalizedData = this.normalizeAttrs(data, included);
    }
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
    if (isEmpty(data)) return;
    Object.keys(data).forEach(key => {
      return Object.assign(normalizedAttrs, this.normalizeAttr(data, key, included));
    });
    return normalizedAttrs;
  }

  static normalizeAttr(data, key) {
    return { [dashToCamel(key)]: data[key] };
  }
}

export default BaseSerializer;
