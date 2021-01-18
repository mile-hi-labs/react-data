import BaseModel from 'models/base-model';
import { dashToCapital } from 'utils/transforms';

function modelFor(models, modelName = ' ', props = {}) {
  let Model = models[dashToCapital(modelName)];
  return Model ? new Model(modelName, props) : new BaseModel(modelName, props);
}

export { modelFor };
