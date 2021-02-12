import { camelToDash, dashToCamel } from 'utils/transforms';
import { isEmpty, logger } from 'utils/helpers';

class BaseSerializer {
  static attrs = {
    store: { serialize: false },
  };


  // Methods
  static checkAttrs(key) {
    let keys = Object.keys(this.attrs);
    return keys.includes(key) ? this.attrs[key] : {};
  }


  // Serialize
  static serialize(data) {
    let serializedData;
    if (isEmpty(data)) return;
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
    if (isEmpty(data)) return;
    Object.keys(data).forEach(key => {
      let attr = this.serializeAttr(data, key);
      if (attr) return serializedAttrs[camelToDash(key)] = attr;
    });
    return serializedAttrs;
  }

  static serializeAttr(data, key) {
    if (isEmpty(data[key])) return;
    if (this.checkAttrs(key).serialize == false) return;

    if (key == 'id') {
      return parseInt(data[key]);
    }
    return data[key];
  }


  // Normalize
  static normalize(data, included = []) {
    let normalizedData;
    if (isEmpty(data)) return;
    if (Array.isArray(data)) {
      normalizedData = [];
      data.forEach(record => normalizedData.push(this.normalizeAttrs(record, included)));
    } else {
      normalizedData = {};
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
