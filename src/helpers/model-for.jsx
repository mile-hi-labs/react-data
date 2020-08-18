import AppModel from 'models/app';
import { logger } from 'utils/helpers';
import { dashToCapital } from 'utils/transforms';

async function modelFor(modelName, store, data = {}) {
	let models = await import(/* webpackIgnore: true */ /* webpackMode: "lazy" */ 'models')
	logger('Models: ', models);
	let Model = models[dashToCapital(modelName)];
	return Model ? new Model(modelName, store, data) : new AppModel(modelName, store, data);
}

export default modelFor;