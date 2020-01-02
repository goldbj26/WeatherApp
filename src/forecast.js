const request = require('request')

const forecast = (latitiue,longitute,callback) => {

	const url = 'https://api.darksky.net/forecast/e5c1d39942755beefc7a3461c4f895be/'+ latitiue + ',' + longitute + ''
	const req = {url: url,json: true}
	request(req, (error,response) => {

		if (error) {
			callback('Unable to connect to forcast services!',undefined)
		}
		else if (response.body.daily === undefined || response.body.daily.data === undefined || response.body.daily.data.length ===0) {
			callback('Unable to read forcast response. Try another search.',undefined)
		}		
		else {	
			// build message string
			let message = 	response.body.daily.data[0].summary
			message += 	'It is currently ' + response.body.currently.temperature + ' degrees.'
			message += 	'There is a ' + response.body.currently.precipProbability + '% chance of rain'
			message += 	'Todays High is: ' + response.body.daily.data[0].temperatureHigh + 'and low is ' + response.body.daily.data[0].temperatureLow
			//console.log('MYmessage', message)
			
			//callback
			callback (undefined,message)			
		}
	})	
}

module.exports = forecast



