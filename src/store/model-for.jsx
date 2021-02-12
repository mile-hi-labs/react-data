import BaseModel from 'models/base-model';
import { dashToCapital } from 'utils/transforms';

function modelFor(models, modelName = ' ', store, props = {}) {
  let Model = models[dashToCapital(modelName)];
  return Model ? new Model(modelName, store, props) : new BaseModel(modelName, store, props);
}

export { modelFor };
