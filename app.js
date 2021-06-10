

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const dotenv = require('dotenv');
dotenv.config();

const homeStartingContent = "This is daily journal page where you can store your great thoughts and publis your thoughts as daily blogs. To publish just add /compose at the end of your link";
const aboutContent = "Information not required for now";
const contactContent = "JUST think";
const mongoose=require("mongoose");
mongoose.connect(process.env.mongoURL,{
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false
});
const postSchema={
  title:String,
  content:String
};

const Post=mongoose.model("Post",postSchema);

const app = express();
var _ = require('lodash');

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));


app.get("/",function(req,res){
  Post.find({}, function(err, posts){
    res.render("home", {
      content: homeStartingContent,
      array: posts
      });
  });
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
  const post=new Post({
    title:req.body.posttitle,
    content:req.body.postbody
  });

  post.save(function(err){
    if(!err)
    {
      res.redirect("/");

    }
  });
  
  
});

app.get("/posts/:p",function(req,res)
{
  const reqtitle=req.params.p;
  Post.findOne({title:reqtitle},function (err,found) {
    if(!err)
    {
      res.render("post",{name:found.title, data:found.content});
    }
    
    
   
  })
 
  
});




app.listen(process.env.PORT||3000, function() {
  console.log("Server started on port 3000");
});
