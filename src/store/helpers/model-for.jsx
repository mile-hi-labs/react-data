import AppModel from 'store/models/app';
import { dashToCapital } from 'store/utils/transforms';

function modelFor(modelName, store, data = {}) {
	return import(/* webpackIgnore: true */ 'models')
	.then(modules => {
		console.log('Models: ', modules);
		let Model = modules[dashToCapital(modelName)];
		return Model ? new Model(modelName, store, data) : new AppModel(modelName, store, data);
	}).catch(e => {
		return e;
	});
}

export default modelFor;