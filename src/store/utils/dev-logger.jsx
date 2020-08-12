const DevLogger = (...data) => {
	if (process.env.NODE_ENV == 'development') {
		return console.log(...data);
	}
}

export default DevLogger;