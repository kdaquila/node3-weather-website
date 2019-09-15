const request = require('request')

let geocode = (address, callback) => {
    let url = "https://api.mapbox.com/geocoding/v5/mapbox.places/" + encodeURIComponent(address) + ".json?access_token=pk.eyJ1Ijoia2ZkMTgyIiwiYSI6ImNqenZjcDc0eTA5cnEzaW1uZjRtbXR2cG8ifQ.Qa-RK6LzzQbwUi1I5jRCcA"
    request({url: url, json:true}, (error, response, {features}) => {
        if (error) {
            callback('Unable to connect to location services', undefined)
        } else if (features.length === 0) {
            callback('Unable to find location. Try another search', undefined)
        } else {
            callback(undefined, {
                latitude: features[0].center[1],
                longitude: features[0].center[0],
                location: features[0].place_name,
            })
        }
    } )
}

module.exports = geocode