import LodashArray from 'lodash/array';

export const addObject = (array, record) => {
  return !array.includes(record) ? array.push(record) : array;
};

export const removeObject = (array, record) => {
  return LodashArray.pull(array, record);
};

export const timer = start => {
  return Date.now() - start + 'ms';
};

export const logger = (...data) => {
  if (process.env.NODE_ENV == 'development') {
    return console.log(...data);
  }
};

export const isEmpty = data => {
  if (data == null || data == undefined) {
    return true;
  }
  if (Array.isArray(data)) {
    return data.length == 0 ? true : false;
  }
  if (typeof data == 'object') {
    return Object.keys(data).length == 0 ? true : false;
  }
  return data.length == 0 ? true : false;
};
