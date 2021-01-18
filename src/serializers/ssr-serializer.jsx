import BaseSerializer from 'serializers/base-serializer';
import { logger } from 'utils/helpers';

class SsrSerializer extends BaseSerializer {
  static attrs = {};
  static ssr = true;

  // Methods
  static serialize(data) {
    let serializedData;
    if(Array.isArray(data)) {
      serializedData = [];
      data.forEach(record => serializedData.push(this.serializeAttrs(record)));
    } else {
      serializedData = {};
      Object.assign(serializedData, this.serializeAttrs(data));
    }
    logger('serializedData: ', serializedData);
    return serializedData;
  }
}

export default SsrSerializer;
