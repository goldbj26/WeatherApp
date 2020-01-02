console.log('client side JS (script.js) is loaded')

const weatherForm = document.querySelector('form')
const searchField = document.querySelector('input')
const m1 = document.querySelector('#message1')
const m2 = document.querySelector('#message2')


const getWeather = (search) => {
	fetch('http://localhost:3000/weather?location=' + search).then( (response) => {
		response.json().then( (data) => {
			if (data.error){
				//console.log(data.error)
				m1.textContent = data.error
			}
			else {
				// console.log('Location',data.location)
				// console.log('Forecast',data.forecast)
				// console.log('Search',search)
				m1.textContent = data.location
				m2.textContent = data.forecast
				
			}
		})
	})
}


weatherForm.addEventListener('submit', (e)=> {
	e.preventDefault() // don't submit page
	//console.log(searchField.value)
	m1.textContent = 'Loading...'
	m2.textContent = ''
	getWeather(searchField.value)
})
