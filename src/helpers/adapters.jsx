import BaseAdapter from 'adapters/base-adapter';
import { dashToCapital } from 'utils/transforms';

function fetchAdapter(adapters, modelName, store) {
	let Adapter = adapters[dashToCapital(modelName)];
	return Adapter ? Adapter : BaseAdapter;
}

export { fetchAdapter }
