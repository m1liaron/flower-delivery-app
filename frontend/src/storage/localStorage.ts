const getStorage = (item: string) => {
	const data = localStorage.getItem(item);
	return data;
};

const setStorage = (item: string, value: string) => {
	const data = localStorage.setItem(value, item);
	return data;
};

export { getStorage, setStorage };
