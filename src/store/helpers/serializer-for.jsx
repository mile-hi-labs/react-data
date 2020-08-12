import AppSerializer from 'store/serializers/app';
import { dashToCapital } from 'store/utils/transforms';

function serializerFor(modelName, store, data = {}) {
	return import(/* webpackIgnore: true */ 'serializers')
	.then(modules => {
		console.log('Serializers: ', modules);
		let Serializer = modules[dashToCapital(modelName)];
		return Serializer ? new Serializer(store, data) : new AppSerializer(store, data);
	}).catch(e => {
		return e;
	});
}

export default serializerFor;