import { dashToCapital } from 'utils/transforms';
import * as Adapters from 'adapters/index';

export default function adapterFor(modelName, store, data = {}) {
	let Adapter = Adapters[dashToCapital(modelName)];
	return Adapter ? Adapter : Adapters['App'];
}