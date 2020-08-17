import AppSerializer from 'store/serializers/app';
import { logger } from 'store/utils/helpers';
import { dashToCapital } from 'store/utils/transforms';

async function serializerFor(modelName, store, data = {}) {
	let serializers = await import(/* webpackIgnore: true */ /* webpackMode: "lazy" */ 'serializers');
	logger('Serializers: ', serializers);
	let Serializer = serializers[dashToCapital(modelName)];
	return Serializer ? new Serializer(store, data) : new AppSerializer(store, data);
}

export default serializerFor;