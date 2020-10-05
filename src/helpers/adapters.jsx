import AppAdapter from 'adapters/app';
import { logger } from 'utils/helpers';
import { dashToCapital } from 'utils/transforms';

async function importAdapters() {
	let adapters = await import(/* webpackIgnore: true */ /* webpackMode: "lazy" */ 'adapters');
	logger('adapters: ', adapters);
	return adapters;
}

function adapterFor(adapters, modelName, store, data = {}) {
	let Adapter = adapters[dashToCapital(modelName)];
	return Adapter ? Adapter : AppAdapter;
}

export {
	importAdapters,
	adapterFor
}