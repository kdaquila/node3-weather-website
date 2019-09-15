let request = require('request')
let util = require('util')

let forecast = (latitude, longitude, callback) => {
    let darkSkyURL = "https://api.darksky.net/forecast/98042b14a6ab9845f10c687e1f7761fa/" + latitude + "," + longitude

    request({url: darkSkyURL, json: true}, (error, response, {currently}) => {
        if (error) {
            callback("Unable to connect to weather service", undefined)
        } else if (response.body.error) {
            callback("Unable to find location", undefined)
        } else {
            let weather = util.format(
                'Currently the weather is %s. The temperature is %d\u00B0F. There is a %d%% chance of rain. The humidity is %s%%. The wind speed is %d mph.', 
                currently.summary, 
                currently.temperature, 
                currently.precipProbability, 
                (currently.humidity * 100).toFixed(1), 
                currently.windSpeed)
            callback(undefined, weather)
        }
    })
}

module.exports = forecast
