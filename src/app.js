const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()

// Setup Express for Handlebars
app.set('view engine', 'hbs')
const viewsPath = path.join(__dirname, "../templates/views")
app.set('views', viewsPath)
const partialsPath = path.join(__dirname, '../templates/partials')
hbs.registerPartials(partialsPath)

// Setup Express for static directory
const publicDirPath = path.join(__dirname, '../public')
app.use(express.static(publicDirPath))


app.get('', (req,res) => {
    res.render('index', {
        title: 'Weather',
        name: "Kenneth D'Aquila"
    })
})

app.get('/about', (req,res) => {
    res.render('about', {
        title: 'About Me',
        name: "Kenneth D'Aquila"
    })
})
app.get('/help', (req,res) => {
    res.render('help', {
        title: 'Help',
        name: "Kenneth D'Aquila",
        helpText: 'This is a help message',
    })
})

app.get('/weather', (req, res) => {

    if (!req.query.search) {
        return res.send({
            error: 'You must provide a search term'
        })
    }

    geocode(req.query.search, (error, {latitude, longitude, location} = {}) => {

        if (error) {
            return res.send({error})
        } 
    
        forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
                return res.send({error})
            }
    
            res.send({
                forecast: forecastData,
                location,
                address: req.query.search,
            })
    
        })    
    })

    
})

app.get('/help/*', (req, res) => {
    res.render('notFound', {
        title: 'Help Article Not Found',
        errorMessage: 'This help article could not be found.',
        name: "Kenneth D'Aquila",
    })
})

app.get('*', (req, res) => {
    res.render('notFound', {
        title: 'Page Not Found',
        errorMessage: 'This page could not be found',
        name: "Kenneth D'Aquila",
    })
})

app.listen(3000, () => {
    console.log('Server is up on port 3000')
})