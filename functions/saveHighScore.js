require('dotenv').config()
const Airtable = require('airtable')

Airtable.configure({
	apiKey: process.env.AIRTABLE_API_KEY,
})

const base = Airtable.base(process.env.AIRTABLE_BASE)
const table = base(process.env.AIRTABLE_TABLE)

exports.handler = async (event) => {
	if (event.httpMethod !== 'POST') {
		return {
			statusCode: 405,
			body: JSON.stringify({ err: 'That method is not allowed' }),
		}
	}
	const { score, name } = JSON.parse(event.body)
	if (typeof score === 'undefined' || !name) {
		return {
			statusCode: 405,
			body: JSON.stringify({ err: 'Bad request' }),
		}
	}

	try {
		const records = await table
			.select({
				sort: [{ field: 'score', direction: 'desc' }],
			})
			.firstPage()

		// massaging the data
		const formattedRecords = records.map((record) => ({
			id: record.id,
			fields: record.fields,
		}))

		// we've got formatted records in order of scores highest to lowest
		// the lowest record is at index 9
		const lowestRecord = formattedRecords[9]

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
