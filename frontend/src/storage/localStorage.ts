const getStorage = <T>(item: string): T | null => {
	const data = localStorage.getItem(item);
	return data ? JSON.parse(data) as T : null;
};

const setStorage = (key: string, value: unknown): void => {
	localStorage.setItem(key, JSON.stringify(value));
};


export { getStorage, setStorage };
