import BaseSerializer from 'serializers/base-serializer';
import { dashToCapital } from 'utils/transforms';

function serializerFor(serializers, modelName) {
  let Serializer = serializers[dashToCapital(modelName)];
  return Serializer ? new Serializer() : new BaseSerializer();
}

export { serializerFor };