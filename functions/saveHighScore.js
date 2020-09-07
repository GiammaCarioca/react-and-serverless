const { table, getHighScores } = require('./utils/airtable')
const {
	getAccessTokenFromHeaders,
	validateAccessToken,
} = require('./utils/auth')

exports.handler = async (event) => {
	const accessToken = getAccessTokenFromHeaders(event.headers)
	const user = await validateAccessToken(accessToken)

	if (!user) {
		return {
			statusCode: 403,
			body: JSON.stringify({ err: 'Unauthorized' }),
		}
	}

	if (event.httpMethod !== 'POST') {
		return {
			statusCode: 405,
			body: JSON.stringify({ err: 'That method is not allowed' }),
		}
	}
	const { score } = JSON.parse(event.body)
	const name = user['https://type-game-react-and-serverless/username']
	if (typeof score === 'undefined' || !name) {
		return {
			statusCode: 400,
			body: JSON.stringify({ err: 'Bad request' }),
		}
	}

	try {
		const records = await getHighScores(false)

		// the lowest record is at index 9
		const lowestRecord = records[9]

		if (
			typeof lowestRecord.fields.score === 'undefined' ||
			score > lowestRecord.fields.score
		) {
			//update this record with the incoming score
			const updatedRecord = {
				id: lowestRecord.id,
				fields: { name, score },
			}
			await table.update([updatedRecord])

			return {
				statusCode: 200,
				body: JSON.stringify(updatedRecord),
			}
		} else {
			return {
				statusCode: 200,
				body: JSON.stringify({}), // it didn't make the top ten
			}
		}
	} catch (err) {
		console.error(err)

		return {
			statusCode: 500,
			body: JSON.stringify({ err: 'Failed to save score in Airtable' }),
		}
	}
}
