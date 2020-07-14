export const camelToUnderscore = (key) => {
  return key.replace( /([A-Z])/g, "_$1").toLowerCase();
}

export const camelToDash = (key) => {
  return key.replace( /([a-z])([A-Z])/g, '$1-$2' ).toLowerCase()
}

export const dashToCamel = (key) => {
  return key.replace(/-([a-z])/g, function (g) { return g[1].toUpperCase() });
}

export const dashToCapital = (key) => {
  return key.split('-').map(key => key.replace(key.charAt(0), key.charAt(0).toUpperCase())).join('');
}

export const phoneToString = (data) => {
	return data.replace(/\D+/g, '');
}