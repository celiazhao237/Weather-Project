const express = require('express')
const https = require('https')
const bodyParser = require('body-parser')

const app = express()
app.use(bodyParser.urlencoded({extended:true}))

app.get('/',function(req,res){
  res.sendFile(__dirname + '/index.html')

})
app.post('/',function(req,res){
  
  console.log('post request received')
  const query = req.body.cityName
  const apiKey = "d8d8adcf600af700d6e6f3b17af231b8"
  const unit = "metric"
  const url = "https://api.openweathermap.org/data/2.5/weather?q="+query+"&appid="+apiKey+"&units="+unit
   https.get(url,function(response){
    console.log(response.statusCode)

    response.on('data',function(data){
      const weatherData = JSON.parse(data)
      const temp = weatherData.main.temp
      const description = weatherData.weather[0].description
      const icon = weatherData.weather[0].icon
      const imgURL = "http://openweathermap.org/img/wn/"+icon+"@2x.png"
      res.write("<p>The weather is currently" + description + "</p>")
      res.write("<h1>The temperature in " + query + " is " + temp + "degrees Cecius</h1>")
      res.write("<img src="+ imgURL + ">")
      res.send()

      // const object = {
      //   name: "celia"
      // }
      // console.log(JSON.stringify(object))
    })

  })
})

app.listen(3000,function(){
  console.log('server is running on port 3000')
})