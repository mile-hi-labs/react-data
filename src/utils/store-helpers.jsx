import LodashArray from 'lodash/array';

// Methods
export const inputProp = (model, name, e) => {
	const { value } = e.target;
	model.set(name, value);
}

export const inputCurrency = (model, name, e) => {
	const { value } = e.target;
	model.set(name, value.split('$')[1]);
}

export const setProp = (model, name, value) => {
	model.set(name, value);
}

export const setRelation = (model, name, value) => {
	model.setRelation(name, value);
}

export const toggleProp = (model, name) => {
	let currentValue = model.get([name]) ? model.get([name]) : false;
	model.set(name, !currentValue);
}

export const pushProp = (model, name, value) => {
	model[name].includes(value) ? this.removeObject(model, name, value) : this.addObject(model, name, value);
}

export const removeObject = (model, name, value) => {
	let newArray = LodashArray.pull(model[name], value);
	model.set(name, newArray);
}

export const addObject = (model, name, value) => {
	let newArray = !model[name].includes(value) ? model[name].push(value) : model[name];
	model.set(name, model[name]);
}