import BaseAdapter from 'adapters/base-adapter';
import { dashToCapital } from 'utils/transforms';

function adapterFor(adapters, modelName) {
  let Adapter = adapters[dashToCapital(modelName)];
  return Adapter ? Adapter : BaseAdapter;
}

export { adapterFor };
