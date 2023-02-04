const fetch = require('node-fetch')
const express = require('express')
const cors = require('cors')

const app = express()

async function proxyMiddleware(req, res, next) {
	const url = 'https://jsonplaceholder.typicode.com' + req.url
	try {
		const request = await fetch(url)
		req.response = await request.json()
	}
	catch (e) {
		console.log(e)
	}
	next()
}

app.use(cors())

// Proxy endpoints
app.use('/', proxyMiddleware);

app.get('/', (req, res) => {
	res.json({
		helloWorld: true
	})
})

app.get('*', (req, res) => {
	if(req.response) {
		return res.json(req.response)
	}
	res.json({
		404: true,
	})
})

app.listen(1338, () => {
	console.log('Server listening on port 1338')
})
