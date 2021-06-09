

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");

const homeStartingContent = "This is daily journal page where you can store your great thoughts and publis your thoughts as daily blogs. To publish just add /compose at the end of your link";
const aboutContent = "Information not required for now";
const contactContent = "AT THE GYM......";
const posts=[];
const app = express();
var _ = require('lodash');

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));


app.get("/",function(req,res){
  res.render("home",{content:homeStartingContent, array:posts});
})


app.get("/about",function(req,res){
  res.render("about",{about:aboutContent});
})

app.get("/contact",function(req,res){
  res.render("contact",{contact:contactContent});
})

app.get("/compose",function(req,res){
  
  res.render("compose");
 
})

app.post("/compose",function(req,res){
  const post={
    title:req.body.posttitle,
    body:req.body.postbody
  }

  posts.push(post);
  
  res.redirect("/");
})

app.get("/posts/:p",function(req,res)
{
  const reqtitle=_.lowerCase(req.params.p);
  posts.forEach(function (ele) {
    var ti=_.lowerCase(ele.title);
    if(ti===reqtitle)
    {res.render("post",{name:ele.title, data:ele.body});
   
  }
  else
  {
    console.log("not a match")
  }
  });
  
})




app.listen(3000, function() {
  console.log("Server started on port 3000");
});
