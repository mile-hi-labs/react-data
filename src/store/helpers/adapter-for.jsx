import AppAdapter from 'store/adapters/app';
import { dashToCapital } from 'store/utils/transforms';

function adapterFor(modelName, store, data = {}) {
	return import(/* webpackIgnore: true */ 'adapters').then(modules => {
		let Adapter = modules[dashToCapital(modelName)];
		return Adapter ? Adapter : AppAdapter;
	}).catch(e => {
		return e;
	})
}

export default adapterFor;