import BaseAdapter from 'adapters/base-adapter';
import { logger } from 'utils/helpers';
import { dashToCapital } from 'utils/transforms';

async function importAdapters() {
	let adapters = await import(/* webpackIgnore: true */ /* webpackMode: "lazy" */ 'adapters');
	logger('adapters: ', adapters);
	return adapters;
}

function adapterFor(adapters, modelName, store, data = {}) {
	let Adapter = adapters[dashToCapital(modelName)];
	return Adapter ? Adapter : BaseAdapter;
}

export {
	importAdapters,
	adapterFor
}