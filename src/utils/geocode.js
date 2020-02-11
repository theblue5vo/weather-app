const request = require('request')
var geoCode = (address,callback) =>{
    var url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+encodeURIComponent(address)+'.json?access_token=pk.eyJ1IjoidGhlYmx1ZTV2byIsImEiOiJjazZlMnl4ZmUwNHhyM2VxZHk1dzc5dW9qIn0.MU1HgUH6Aa4wQicMRyJQgA&limit=1'

    request({url, json:true},(error,{body})=>{
        if(error){
            callback('Please check the internet',undefined)

        }else if(body.features.length==0){
            callback('No location found',undefined);
            
        }else{
            data_list = body.features[0].center
            lat = data_list[1]
            long = data_list[0]
            location = body.features[0].place_name
            callback(undefined,{
                lat:lat,
                long:long,
                location:location
            })
        }
    })
}

module.exports=geoCode