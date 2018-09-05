//require express and init the mini app
const express = require('express')
const app = express.Router()
// require passport and the facebook strategy
const passport = require('passport')
const passport_fb = require('passport-facebook')
// require jsonwebtoken
const jwt = require('jsonwebtoken');
// require the models
const db = require('../models');

passport.use(new passport_fb({
        clientID:"1176901365785017",
        clientSecret:"b9ac2e3b3fc09a0c96b828859ce4d668",
        callbackURL: "http://localhost:3000/user/facebook/callback",
    },
    (accessToken, refreshToken, profile, cb)=>{
        cb(null,profile)
    }))

app.get('/login',passport.authenticate('facebook',{session: false}))


app.get('/facebook/callback',
    function(req, res,next) {
        passport.authenticate('facebook',{session:false},(err,user,info)=>{
            if(err) return next(err)
            if(!user) return res.redirect('/user/login')
            db.user.findOrCreate({where:{id:user.id}})
            let body = {
                id: user.id,
                name: user.displayName,
                email: user.email
            }
            return res.send(jwt.sign(body,process.env.SECRET))
        })(req,res,next)
    });




module.exports = app;