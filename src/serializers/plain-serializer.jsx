import BaseSerializer from 'serializers/base-serializer';
import { logger } from 'utils/helpers';

class PlainSerializer extends BaseSerializer {
  static attrs = {};


  // Methods
  static serialize(data) {
    let serializedData = super.serialize(data);
    return serializedData.data.attributes;
  }
}

export default PlainSerializer;
