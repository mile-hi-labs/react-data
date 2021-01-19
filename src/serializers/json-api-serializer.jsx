import { camelToDash, dashToCamel } from 'utils/transforms';
import { isEmpty, logger } from 'utils/helpers';

class JsonApiSerializer {
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
    let serializedData;
    if (Array.isArray(data)) {
      serializedData = [];
      data.forEach(record => serializedData.push(this.serializeAttrs(record)));
    } else {
      serializedData = {};
      Object.assign(serializedData, this.serializeAttrs(data));
    }
    logger('serializedData: ', serializedData);
    return { data: { attributes: serializedData } };
  }

  static serializeAttrs(data) {
    let serializedAttrs = {};
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
    if (Array.isArray(data[key])) {
      return this.serializeRelationships(data, key);
    }
    if (typeof data[key] == 'object') {
      return this.serializeRelationship(data, key);
    }
    return data[key];
  }

  static serializeRelationships(data, key) {
    let serializedRelationship = [];

    data[key].forEach(relation => {
      if (this.checkRelationships(key).serialize == 'id') {
        return serializedRelationship.push({ id: parseInt(relation.id) });
      }
      if (this.checkRelationships(key).serialize == true) {
        return serializedRelationship.push(this.serializeAttrs(relation));
      }
    });
    return serializedRelationship;
  }

  static serializeRelationship(data, key) {
    if (this.checkRelationships(key).serialize == 'id') {
      return { id: parseInt(data[key].id) };
    }
    if (this.checkRelationships(key).serialize == true) {
      return this.serializeAttrs(data[key]);
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

  static normalizeAttr(data, key, included) {
    if (typeof data[key] == 'object') {
      if (key == 'attributes') {
        return this.normalizeAttrs(data[key], included);
      }
      if (key == 'relationships') {
        return this.normalizeRelationships(data[key], included);
      }
      return this.normalizeAttrs(data[key], included);
    }
    return { [dashToCamel(key)]: data[key] };
  }

  static normalizeRelationships(data, included) {
    let normalizedRelationships = {};
    Object.keys(data).forEach(key => {
      let relationData = data[key].data;
      if (isEmpty(relationData)) {
        return;
      }
      if (Array.isArray(relationData)) {
        return normalizedRelationships[dashToCamel(key)] = relationData.map(relation => this.normalizeRelationship(relation, included));
      }
      if (typeof relationData == 'object') {
        return normalizedRelationships[dashToCamel(key)] = this.normalizeRelationship(relationData, included);
      }
      return normalizedRelationships[dashToCamel(key)] = this.normalizeRelationship(relationData, included);
    });
    return normalizedRelationships;
  }

  static normalizeRelationship(relationship, included) {
    let include = included.find(include => include.type == relationship.type && include.id == relationship.id);
    return !isEmpty(include) ? this.normalizeAttrs(include) : {};
  }
}

export default JsonApiSerializer;
