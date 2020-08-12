import LodashArray from 'lodash/array';

export const timeout = (ms) => {
	return new Promise(resolve => setTimeout(resolve, ms));
}

export const addObject = (array, record) => {
	let newArray = !array.includes(record) ? array.push(record) : array;
	return array;
}

export const removeObject = (array, record) => {
	let newArray = LodashArray.pull(array, record);
	return newArray;
}

export const isEmpty = (data) => {
	if (data == null || data == undefined || data == 'undefined') {
		return true
	}
	if (Array.isArray(data)) {
		return data.length == 0 ? true : false;
	}
	if (data.constructor == Object) {
	 return Object.keys(data) == 0 ? true : false;
	}
	return data.length == 0 ? true : false;
}