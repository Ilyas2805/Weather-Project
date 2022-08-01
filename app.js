const express = require("express");
const { watch } = require("fs");
const https = require("https");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function(req, res){
    res.sendFile(__dirname + "/index.html");
})

app.post("/", function(req, res){
    const nameCity = req.body.cityName;
    const apiKey = "83375260f5339eacd8945bff02141aae";
    const unit = "metric";

    const url = "https://api.openweathermap.org/data/2.5/weather?q=" + nameCity +"&appid="+ apiKey +"&units=" + unit;
    https.get(url, function(response){
        console.log(response.statusCode);

        response.on("data", function(data){
            const weatherData = JSON.parse(data);
            const cityName = weatherData.name;
            const temp = weatherData.main.temp;
            const description = weatherData.weather[0].description;
            const icon = weatherData.weather[0].icon;

            res.write("<h1>The temperature in " + cityName + " is " + temp + " degrees Celcius</h1>");
            res.write("<p>The weather is currently " + description + "</p>");
            res.write("<img style='background-color: #87CEEB; border-radius: 20px' src='http://openweathermap.org/img/wn/"+ icon +"@2x.png'></img>");
            res.send();
        })
    })
})




app.listen(3000, function(){
    console.log("Server is running on port 3000.")
})