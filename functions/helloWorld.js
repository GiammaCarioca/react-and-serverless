exports.handler = async (event) => {
	// const data = await callAPI();

	return {
		statusCode: 200,
		body: JSON.stringify({
			msg: 'Hello World',
		}),
	}
}
