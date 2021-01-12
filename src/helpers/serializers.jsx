import BaseSerializer from 'serializers/base-serializer';
import { dashToCapital } from 'utils/transforms';

function serializerFor(serializers, modelName, store) {
  let Serializer = serializers[dashToCapital(modelName)];
  return Serializer ? new Serializer(store) : new BaseSerializer(store);
}

export { serializerFor };
