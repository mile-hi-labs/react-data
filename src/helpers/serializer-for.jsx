import AppSerializer from 'serializers/app';
import { logger } from 'utils/helpers';
import { dashToCapital } from 'utils/transforms';

async function serializerFor(modelName, store, data = {}) {
	let serializers = await import(/* webpackIgnore: true */ /* webpackMode: "lazy" */ 'serializers');
	logger('Serializers: ', serializers);
	let Serializer = serializers[dashToCapital(modelName)];
	return Serializer ? new Serializer(store, data) : new AppSerializer(store, data);
}

export default serializerFor;