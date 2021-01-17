import BaseModel from 'models/base-model';
import { dashToCapital } from 'utils/transforms';

function modelFor(models, modelName, store, data = {}) {
  let Model = models[dashToCapital(modelName)];
  return Model ? new Model(modelName, store, data) : new BaseModel(modelName, store, data);
}

export { modelFor };