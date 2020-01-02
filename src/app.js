const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./geocode')
const forecast = require('./forecast')

//Express Web Server
const app = express()
const port = process.env.PORT || 3000 // heroku sets the env variable "PORT". if not there, use default 3000

// Paths
const publicDirectoryPath = path.join(__dirname,'\..\\public')
const viewsDirectoryPath = path.join(__dirname,'\..\\templates\\views')
const partialsDirectoryPath = path.join(__dirname,'\..\\templates\\partials')
//console.log(publicDirectoryPath)

// HandleBars Setup
app.set('view engine','hbs') // allows express to use handle bars. expects them to be in folder called "views"
app.set('views',viewsDirectoryPath) // changes default views directory path
//console.log('DIR***',viewsDirectoryPath)
hbs.registerPartials(partialsDirectoryPath)

// Static Directory Setup
app.use(express.static(publicDirectoryPath)) // base route automatically calls index.html. allows for file paths (old way). can still use routes below

// Routes
app.get('', (req,res)=>{
	//res.send('Hello express!')
	res.render('index', {  // render (linked up to hbs) automatically now calls views/index.hbs
		title: 'Weather App',
		name: 'Andrew Mead'
	}) 
})

app.get('/weather', (req,res)=>{	
	if (!req.query.location) {
		return res.send({error: 'You must provider a location'})
	}
	else {

		geocode(req.query.location, (error,data) => {
			if (error) {
				//console.log('Error: ',error)
				return res.send({error: error})
			} 
			else {
				//console.log('Data: ',data)
			}
	
			forecast(data.latitude,data.longitute, (error2,data2) => {
				if (error2) {
					//console.log('Error: ',error2)
					return res.send({error: error})
				} 
				else {
					//console.log('Location: ',data.location)
					//console.log('Data: ',data2)
					return res.send({
						location: data.location,
						forecast: data2,
						search: req.query.location
					})
				}
			})
	
		})	
	}


})

app.get('/help', (req,res)=>{	
	res.render('help', {
		title: 'HELP!',
		name: 'Andrew Mead'
	}) 
})

app.get('/about', (req,res)=>{	
	res.render('about', {
		title: 'About',
		name: 'Andrew Mead'
	}) 
})

// 404 not found
app.get('/help/*', (req,res)=>{	
	res.render('404', {		
		title: '404',
		name: 'Andrew Mead',
		errorMessage: 'Page Not Found'
	})
	//res.send('<h1>404 Help Page Not Found :(</h1>')
})
app.get('*', (req,res)=>{
	res.render('404', {
		title: '404',
		name: 'Andrew Mead',
		errorMessage: 'Help Page Not Found'
	}) 
	//res.send('<h1>404 Not Found :(</h1>')
})



// Web Server Startup()
app.listen(port, ()=>{
	console.log('Server is upon port ' + port)
})

