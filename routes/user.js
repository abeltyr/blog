//require express and init the mini app
const express = require('express')
const app = express.Router()
const Config = require('../config/config')


// require passport and the facebook strategy
const passport = require('passport')
const passport_fb = require('passport-facebook')
const passport_go = require('passport-google-oauth').OAuth2Strategy


//const passport_google = require('')
// require jsonwebtoken
const jwt = require('jsonwebtoken');


// require the models
const db = require('../models');

// facebook strategy
passport.use(new passport_fb({
        clientID: Config.env.FACEBOOK_APP_ID,
        clientSecret: Config.env.FACEBOOK_APP_SECRET,
        callbackURL: "http://localhost:3000/user/facebook/callback",
        profileFields: ['id', 'displayName', 'emails', 'picture.type(small)', 'link']
    },
    (accessToken, refreshToken, profile, cb) => {
        cb(null, profile)
    }))
// google strategy
passport.use(new passport_go({
        clientID: Config.env.GOOGLE_APP_ID,
        clientSecret: Config.env.GOOGLE_APP_SECRET,
        callbackURL: "http://localhost:3000/user/google/callback",
    },
    function (accessToken, refreshToken, profile, done) {
        return done(null, profile)
    }
))

// login link for google /user/google/login
app.get('/google/login', passport.authenticate('google', {
    scope: ['profile', 'email']
}))

// login link /user/facebook/login
app.get('/facebook/login', passport.authenticate('facebook', {
    scope: ['email', 'public_profile'],
}))

// facebook callback
app.get('/facebook/callback',
    function (req, res, next) {
        passport.authenticate('facebook', {
            session: false
        }, (err, user, info) => {
            if (err) return next(err)
            if (!user) return res.redirect('/user/login')
            console.log(user)
            // db.user.findOrCreate({
            //         where: {
            //             facebook_id: user.id,
            //             full_name: user.displayName,
            //             image: "null",
            //             email: "null"
            //         }
            //     }).then(doc => {
            //         db.user.findOne({
            //             where: {
            //                 id: doc.id
            //             }
            //         }, {
            //             image: user.photos[0].value
            //         }).then(moddoc => {
            //             let body = {
            //                 facebook_id: user.id,
            //                 full_name: user.displayName,
            //                 image: user.photos[0].value,
            //                 email: "null"
            //             }
            //             return res.json({
            //                 "access_token": jwt.sign(body, process.env.SECRET),
            //                 "type": "Bearer"
            //             })
            //         })
            //     })
            //     .catch(err => res.status(500).json(err))


        })(req, res, next)
    });

// google callback

// having trouble with the link so changed it to an email 

app.get('/google/callback', function (req, res, next) {
    passport.authenticate('google', (err, user, info) => {
        if (err) return next(err)
        if (!user) return res.redirect('/user/login')
        db.user.findOrCreate({
            where: {
                google_id: user.id,
                full_name: user.displayName,
                image: user._json.image.url,
                email: user.emails[0].value
            }
        }).then(doc => {
            let body = {
                id: doc[0].id,
                google_id: user.id,
                full_name: user.displayName,
                image: user._json.image.url,
                email: user.emails[0].value
            }
            return res.json({
                "access_token": jwt.sign(body, process.env.SECRET),
                "type": "Bearer"
            })
        }).catch(err => {
            res.status('500').json('internal server error')
        })
    })(req, res, next)
})




module.exports = app;