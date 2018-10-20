var express = require('express');

var app = express();

var bodyParser = require("body-parser");

var mongoose = require("mongoose");

app.use(express.static("public"));

var methodOverride = require("method-override");

mongoose.connect("mongodb://localhost/restdb");

app.set("view engine", "ejs");
var blogSchema  = new mongoose.Schema({
    name: String,
    image: String,
    desc: String
})

app.use(methodOverride("_method"));

var Blog = mongoose.model("Blog", blogSchema);

app.use(bodyParser.urlencoded({ extended: true }));


app.get("/", function(req, res){
    res.redirect("/blogs");
})

app.get("/blogs", function(req, res){

    Blog.find({}, function(err, blogsFound){
        if (err){
            console.log(err);
        }
        else {
             res.render("home", {blogs: blogsFound});
        }
    })

})

app.get("/blogs/new", function(req, res){
    res.render("addpost")
})

app.post("/blogs", function(req, res){
    Blog.create(req.body.blog, function(err, addedBlog){
        if (err){
            console.log(err);
        }
        else {
            res.redirect("/blogs")
        }
    })
})


app.get("/blogs/:id", function(req, res){
    Blog.findById(req.params.id, function(err, editBlog){
        if(err){
            console.log(err);
        } else {
             res.render("editform", {blog: editBlog});
        }
    })

})

app.put("/blogs/:id", function(req, res){
    Blog.findByIdAndUpdate(req.params.id, req.body.blog, function(err, updBlog){
        if(err){
            console.log(err);
        } else {
            res.redirect("/blogs")
        }
    })
})


app.delete("/blogs/:id", function(req, res){
    Blog.findByIdAndDelete(req.params.id, function(err, updBlog){
        if(err){
            console.log(err);
        } else {
            res.redirect("/blogs")
        }
    })
})

app.listen(3000, 'localhost', function(req, res){
    console.log("Rest server started!!");
})
