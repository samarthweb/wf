


var express = require("express");

var path = require("path");

const test = express();

test.use(express.static("public"));

var data = require('./final.js');

const port = process.env.PORT || 8080;

function onhttp(){
  console.log("Express http server listening on",port);
}

test.get("/", function(req,res){res.sendFile(path.join(__dirname, '/finalViews/home.html'));});

test.get("/register", function(req,res){
  res.sendFile(path.join(__dirname, '/finalViews/register.html'));
});


test.get("/signIn", function(req,res){
  res.sendFile(path.join(__dirname, '/finalViews/signIn.html'));
});

test.post("/register",(req, res) => {
  data.registerUser(req.body).then(() =>{
   res.send(data.email + ' <br> <a href ="/home">Go home</a>');
  }).catch(err => res.render({message: "Error"}));

});

test.post("/signIn",(req, res) => {
  data.signIn().then(() =>{
  }).catch(err => res.render({message: "Error"}));

})

test.get("*", (req, res)=>{

  res.status(404).send("Error 404: page not found.")

});

  test.use((req, res) => {
    res.status(404).send("Page Not Found");
  });

  data.startDB()
  .then(data.startDB)
  .then(function () {
    test.listen(port, onhttp);
   })
   .catch(function (err) {
     console.log('Failed to start!' + err);
   });

   
  