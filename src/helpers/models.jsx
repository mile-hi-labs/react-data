import BaseModel from 'models/base-model';
import { logger } from 'utils/helpers';
import { dashToCapital } from 'utils/transforms';

function fetchModel(models, modelName, store, data = {}) {
	let Model = models[dashToCapital(modelName)];
	return Model ? new Model(modelName, store, data) : new BaseModel(modelName, store, data);
}

export { fetchModel }
