import AppModel from 'store/models/app';
import { logger } from 'store/utils/helpers';
import { dashToCapital } from 'store/utils/transforms';

async function modelFor(modelName, store, data = {}) {
	let models = await import(/* webpackIgnore: true */ /* webpackMode: "lazy" */ 'models')
	logger('Models: ', models);
	let Model = models[dashToCapital(modelName)];
	return Model ? new Model(modelName, store, data) : new AppModel(modelName, store, data);
}

export default modelFor;