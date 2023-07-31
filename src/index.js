export default {
	id: 'vonage',
	handler: (router, { env }) => {
		// Router config goes here
		const axios = require('axios');
		const vonage_host = "https://api.nexmo.com";
		const vonage_api_key = env.VONAGE_API_KEY;
		const vonage_secret = env.VONAGE_API_SECRET;
		const vonage_api = axios.create({
		 	baseURL: vonage_host,
			auth: {
				username: vonage_api_key,
				password: vonage_secret,
			},
		});

		router.get('/*', (req, res) => {
			vonage_api.get(`${req.url}&account_id=${vonage_api_key}`).then((response) => {
				res.json(response.data);
			}).catch((error) => {
				res.json({
					code: error.code,
					message: error.message,
					status: error.status,
				});
			});
		});

		router.post('/*', (req, res) => {
			vonage_api.post(req.url, new URLSearchParams(req.body)).then((response) => {
				res.json(response.data);
			}).catch((error) => {
				res.json({
					code: error.code,
					message: error.message,
					status: error.status,
				});
			});
		});
	},
};