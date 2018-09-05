const express = require('express')
const db = require('../models')
const app = express.Router()
const FEED = require('../app/Controllers/feedbackController')


app.route('/all/:id')
    .get(FEED.list_all)
app.route('/New')
    .post(FEED.New_comment)
app.route('/Delete/:id')
    .delete(FEED.Delete_comment)

module.exports = app;