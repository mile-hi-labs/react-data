import Path from 'path';
import AppAdapter from 'store/adapters/app';
import { dashToCapital } from 'store/utils/transforms';

async function adapterFor(modelName, store, data = {}) {
	let modules = await import(/* webpackIgnore: true */ /* webpackMode: "lazy" */ 'adapters');
	console.log('modules: ', modules);
	let Adapter = modules[dashToCapital(modelName)];
	return Adapter ? Adapter : AppAdapter;
}

export default adapterFor;