var express = require('express')
var path = require('path')
var hbs = require('hbs')
const geoCode = require('./utils/geocode.js')
const forecast = require('./utils/forecast.js')

var app= express()
var port = process.env.PORT || 3000

// define paths for express config
var publicDirectory = path.join(__dirname,'../public')
var viewsPath = path.join(__dirname,'../templates/views')
var partialsPath = path.join(__dirname,'../templates/partials')

//Setup handlebar engine and location
app.set('view engine','hbs')
app.set('views',viewsPath)
hbs.registerPartials(partialsPath)

//Setup static directory
app.use(express.static(publicDirectory))

// app.get
app.get('',(req,res)=>{
    res.render('index',{
        title:'Weather',
        name:'Shuvo'
    })
})

app.get('/about',(req,res)=>{
    res.render('about',{
       title:'About me',
       name:'Shuvo'
    })
})

app.get('/help',(req,res)=>{
    res.render('help',{
       title:'Help page',
       name:'Shuvo',
       message:'Updating'
    })
})


app.get('/weather',(req,res)=>{
    if (!req.query.address){
        return res.send({
            error:'You must provide an address'
        })
    }
    geoCode(req.query.address,(error,{lat,long,location}={})=>{
        if (error){
            return res.send({error})
        }
        forecast(lat, long, (error, forecastData) => {
        if(error){
            return res.send({error})
        }
        res.send({
            location,
            forecastData,
            address:req.query.address
        })
       
        })
    })
})
app.get('/help/*',(req,res)=>{
    res.render('404',{
        title:'404',
        errorMessage:'Help article not found'

    })

})
app.get('*',(req,res)=>{
    res.render('404',{
        title:'404',
        errorMessage:'Page not found',
        name:'Shuvo'

    })

})
//Start app
app.listen(port,()=>{
    console.log('it is up on port'+port)
})
