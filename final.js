
var db ='mongodb+srv://sam:sam@cluster0.6sbpxn7.mongodb.net/?retryWrites=true&w=majority';

var mongoose = require("mongoose");


var Schema = mongoose.Schema;

const bcrypt = require('bcryptjs');
var finalUsers = new Schema({
  "email":{ type: String,
    unique: true
},
  "password": String,
});


let U;


module.exports.startDB = function(){
  return new Promise((resolve, reject)=> {
      U = mongoose.createConnection(db, { useNewUrlParser: true, useUnifiedTopology: true }, function(error){
          if(error){console.log(error);reject();}
          else { console.log("Db connection successful."); U = U.model("users", finalUsers); resolve();   }
      });
  });
}

module.exports.signIn = function(info){
  return new Promise((resolve, reject)=> {User.findOne({ email: info.email}) .exec()
      .then((value) => {
       if (!value){console.log(": "+info.email); reject();} 
       
       else{ bcrypt.compare(info.password, value.password).then((res) => {
      
              if (res === false) {  reject(": "+info.email); }
              else if(res === true){ value.loginHistory.push({dateTime: (new Date()).toString(), userAgent: info.userAgent}); console.log("");}});
       } })});}

       
module.exports.registerUser = function(info){return new Promise((resolve, reject)=> {

  if(info.password === "" || info.email === "" ){ reject("Error: cannot be empty. ");}
  bcrypt.genSalt(10, function(err, salt) { bcrypt.hash(info.password, salt, function(err, hashValue) { 
         if(err){reject("Error");   }
         else{info.password = hashValue; let newUser = new  User(info); newUser.save((err) => {
      if(err && err.code == 11000) {reject("user's name already taken");
      } else if(err && err.code != 11000) {reject("Error: . "+err);}
      else{
          console.log("Success");resolve();
      } 
    });}});});});}


