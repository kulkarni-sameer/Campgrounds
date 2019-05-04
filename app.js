var express = require('express');

var app = express();

var bodyParser = require("body-parser");

var mongoose = require("mongoose");

app.use(express.static("public"));

var methodOverride = require("method-override");
app.use(methodOverride("_method"));

mongoose.connect("mongodb://localhost/campdb");

app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({ extended: true }));



var campSchema  = new mongoose.Schema({
    name: String,
    image: String,
    desc: String,
    address: String
    
})
var Camp = mongoose.model("Camp", campSchema);


var userSchema  = new mongoose.Schema({
    name: String,
    email: String,
    camps : [campSchema]
})
var User = mongoose.model("User", userSchema);

var newUser = new User({
    name: "Sameer",
    email : "sameer43445@gmail.com"
})



newUser.camps.push({
    name: "ondublog",
    image: "https://newhampshirestateparks.reserveamerica.com/webphotos/NH/pid270015/0/540x360.jpg",
    desc : "lets try if this works",
    address : "1019 E uni dr"
})

newUser.save(function(err, user){
    if(err){
        console.log(err);
    } else {
        console.log(user);
    }
});


app.get("/", function(req, res){
    res.redirect("/campgrounds");
})

app.get("/campgrounds", function(req, res){

    Camp.find({}, function(err, campsFound){
        if (err){
            console.log(err);
        }
        else {
             res.render("home", {camps: campsFound});
        }
    })

})

app.get("/campgrounds/new", function(req, res){
    res.render("addpost")
})

app.post("/campgrounds", function(req, res){
    Camp.create(req.body.camp, function(err, addedCamp){
        if (err){
            console.log(err);
        }
        else {
            res.redirect("/campgrounds")
        }
    })
})


app.get("/campgrounds/:id", function(req, res){
    Camp.findById(req.params.id, function(err, editCamp){
        if(err){
            console.log(err);
        } else {
             res.render("editform", {camp: editCamp});
        }
    })

})

app.put("/campgrounds/:id", function(req, res){
    Camp.findByIdAndUpdate(req.params.id, req.body.camp, function(err, updCamp){
        if(err){
            console.log(err);
        } else {
            res.redirect("/campgrounds")
        }
    })
})


app.delete("/campgrounds/:id", function(req, res){
    Camp.findByIdAndDelete(req.params.id, function(err, updCamp){
        if(err){
            console.log(err);
        } else {
            res.redirect("/campgrounds")
        }
    })
})

app.listen(3000, 'localhost', function(req, res){
    console.log("Server started!!");
})
