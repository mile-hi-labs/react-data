import AppModel from 'models/app';
import { logger } from 'utils/helpers';
import { dashToCapital } from 'utils/transforms';

async function importModels() {
	let models = await import(/* webpackIgnore: true */ /* webpackMode: "lazy" */ 'models');
	logger('models: ', models);
	return models;
}

function modelFor(models, modelName, store, data = {}) {
	let Model = models[dashToCapital(modelName)];
	return Model ? new Model(modelName, store, data) : new AppModel(modelName, store, data);
}

export {
	importModels,
	modelFor
}