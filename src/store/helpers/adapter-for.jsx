import AppAdapter from 'store/adapters/app';
import { logger } from 'store/utils/helpers';
import { dashToCapital } from 'store/utils/transforms';

async function adapterFor(modelName, store, data = {}) {
	let adapters = await import(/* webpackIgnore: true */ /* webpackMode: "lazy" */ 'adapters');
	logger('Adapters: ', adapters);
	let Adapter = adapters[dashToCapital(modelName)];
	return Adapter ? Adapter : AppAdapter;
}

export default adapterFor;