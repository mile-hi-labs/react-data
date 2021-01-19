import BaseSerializer from 'serializers/base-serializer';
import { camelToDash, dashToCamel } from 'utils/transforms';
import { isEmpty, logger } from 'utils/helpers';

class JsonApiSerializer extends BaseSerializer {
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
    let serializedData = super.serialize(data);
    return { data: { attributes: serializedData } };
  }

  static serializeAttrs(data) {
    let serializedAttrs = super.serializeAttrs(data);
    return serializedAttrs;
  }

  static serializeAttr(data, key) {
   let serializedAttr = super.serializeAttr(data);
   return serializedAttr;
  }

  static serializeRelationships(data, key) {
   let serializedRelationships = super.serializeRelationships(data);
   return serializedRelationships;
  }

  static serializeRelationship(data, key) {
    let serializedRelationship = super.serializeRelationship(data);
    return serializedRelationship;
  }


  // Normalize
  static normalize(data, included = []) {
    let normalizedData = super.normalize(data, included);
    return normalizedData;
  }

  static normalizeMeta(meta) {
    let normalizedMeta = super.normalizeMeta(meta);
    return normalizedMeta;
  }

  static normalizeAttrs(data, included = []) {
    let normalizedAttrs = super.normalizeAttrs(data, included);
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
    return super.normalizeAttr(data, key);
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
