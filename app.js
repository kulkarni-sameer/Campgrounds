var express = require('express');

var app = express();

var bodyParser = require("body-parser");

var mongoose = require("mongoose");

mongoose.connect("mongodb://localhost/restdb");

app.set("view engine", "ejs");
var campSchema  = new mongoose.Schema({
    name: String,
    image: String,
    desc: String
})

var Camps = mongoose.model("Camp", campSchema);

app.use(bodyParser.urlencoded({ extended: true }));


app.get("/", function(req, res){
    res.render("home");
})

app.post("/addcamp", function(req, res){
    
    Camps.create(req.body.camp);
         res.redirect("viewcamps")
    })
   


app.listen(process.env.PORT, process.env.IP, function(req, res){
    console.log("Rest server started!!");
})