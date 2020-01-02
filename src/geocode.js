const request = require('request')


const geocode = (location,callback) => {

	const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+ encodeURIComponent(location) +'.json?access_token=pk.eyJ1IjoiZ29sZGJqMjYiLCJhIjoiY2s0OXo0eWpyMDhuNTNtbXgyZW93Zjd3aiJ9._teBdVTqVktNMXphsj61FA&language=en&limit=1'
	const req = {url: url,json: true}
	request(req, (error,response) => {

		if (error) {
			callback('Unable to connect to location services!',undefined)
		}
		else if (response.body.features === undefined) {
			callback('Unable to read location response. Try another search.',undefined)
		}
		else if (response.body.features.length === 0) {
			callback('Unable to find location. Try another search.',undefined)
		}
		else {			
			callback(undefined,{
				latitude: response.body.features[0].center[1],
				longitute: response.body.features[0].center[0],
				location: response.body.features[0].place_name
			})
		}
	})	
}


// geocode('Kiryat Yearim', (error,data) => {
// 	console.log('Error: ',error)
// 	console.log('Data: ',data)
// })

module.exports = geocode



