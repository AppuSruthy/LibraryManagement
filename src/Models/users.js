var mongoose=require("mongoose");
var userschema=new mongoose.Schema({
    UserName:String,
    Password:String
});

var usermodel = new mongoose.model('users',userschema,'users');

module.exports=usermodel;