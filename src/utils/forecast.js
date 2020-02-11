const request = require('request')

var forecast = (lat,long,callback)=>{
    url = 'https://api.darksky.net/forecast/586bf69279a728f4d2ff3f1ff39455a5/'+encodeURIComponent(lat)+','+encodeURIComponent(long)+'?units=si'

    request({url, json:true},(error,{body})=>{
        if (error){
            callback('Check the internet connection',undefined)
            
        }else if(body.error){
            callback('please recheck the input',undefined)
            

        }    else{

            var currently = body.currently
            var byday = body.daily.data

            callback(undefined,byday[0].summary+' temperature is '+currently.temperature+' degree and probability of rain is '+currently.precipProbability+'%')

        }
    })

}



module.exports= forecast