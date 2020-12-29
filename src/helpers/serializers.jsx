import BaseSerializer from 'serializers/base-serializer';
import { dashToCapital } from 'utils/transforms';

function fetchSerializer(serializers, modelName, store, data = {}) {
	let Serializer = serializers[dashToCapital(modelName)];
	return Serializer ? new Serializer(store, data) : new BaseSerializer(store, data);
}

export { fetchSerializer };
