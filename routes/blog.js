const express = require('express')
const db = require('../models')
const app = express.Router()
const BLOG = require('../Controllers/BlogController')

// app.get("/all", (req, res) => {
//     db.blog.findAll({}).then(result => {
//         res.json(["data", result]);
//     });
// });

app.route('/all')
    .get(BLOG.list_all)
app.route('/all/Category/:category')
    .get(BLOG.list_Category)
app.route('/all/Title/:title')
    .get(BLOG.list_Title)
app.route('/User/:user')
    .get(BLOG.blog_User)
app.route('/New')
    .post(BLOG.New_blog)
app.route('/Update/:id')
    .put(BLOG.Update_blog)
app.route('/Delete/:id')
    .delete(BLOG.Delete_blog)


module.exports = app;