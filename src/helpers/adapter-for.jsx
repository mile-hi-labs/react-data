import AppAdapter from 'adapters/app';
import { logger } from 'utils/helpers';
import { dashToCapital } from 'utils/transforms';

async function adapterFor(modelName, store, data = {}) {
	let adapters = await import(/* webpackIgnore: true */ /* webpackMode: "lazy" */ 'adapters');
	logger('Adapters: ', adapters);
	let Adapter = adapters[dashToCapital(modelName)];
	return Adapter ? Adapter : AppAdapter;
}

export default adapterFor;