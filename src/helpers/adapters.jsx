import BaseAdapter from 'adapters/base-adapter';
import { logger } from 'utils/helpers';
import { dashToCapital } from 'utils/transforms';

function adapterFor(adapters, modelName, store, data = {}) {
	let Adapter = adapters[dashToCapital(modelName)];
	return Adapter ? Adapter : BaseAdapter;
}

export { adapterFor }
