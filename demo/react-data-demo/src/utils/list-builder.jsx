export const listBuilder = (count = 3) => {
	let list = [];
	while (list.length < count) {
		list.push(list.length);
	}
	return list;
}
