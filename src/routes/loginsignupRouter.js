const express = require('express');
const mongoose = require('mongoose');
const usermodel=require('../Models/users');
const url="mongodb://127.0.0.1:27017/booksdb";
const LoginSignupRouter = express.Router();

mongoose.connect(url,function(err){
    if (err) throw err
    else
    {
        console.log("users connection estalished");
    }
})

function router(nav) {
    LoginSignupRouter.route('/')
        .get((req, res) => {
            res.render('login.ejs', {
                nav,
                title: "Login"
            });
        });

        LoginSignupRouter.route('/logins')
        .post((req,res)=>{
            usermodel.findOne({UserName:req.body.email,Password:req.body.pwd},function(err,user){
                if(err)
                {  throw err;
                 return   res.status(500).send();
                } 
                
                    if(!user){
                 return       res.status(404).send();
                    }
               return res.status(200).send('successfully logged in!!');
            });
        });

    LoginSignupRouter.route('/signup')
        .get((req, res) => {
            res.render('signup.ejs', {
                nav,
                title: "Sign Up"
            });
        });

        LoginSignupRouter.route('/savesignup')
        .post((req,res)=>{
           var newuser = new usermodel();
           newuser.UserName=req.body.email;
           newuser.Password=req.body.psw;
           newuser.save(function(err){
               if(err) throw err;
               else
               {
                   res.send("credentials saved");
               }
           })
        })
    return LoginSignupRouter;
}

module.exports = router;