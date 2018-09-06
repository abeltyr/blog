const express = require('express')
const db = require('../models')
const app = express.Router()
const FOLLOW = require('../app/Controllers/FollowController')


app.route('/Following/User/:id')
    .get(FOLLOW.Following_user)

app.route('/Following/Category/:id')
    .get(FOLLOW.Following_category)

app.route('/Follow/Category')
    .post(FOLLOW.Follow_category)

app.route('/Follow/User')
    .post(FOLLOW.Follow_user)

app.route('/Unfollow/Category')
    .delete(FOLLOW.unfollow_category)

app.route('/Unfollow/User')
    .delete(FOLLOW.Unfollow_user)

module.exports = app;