const express = require('express')
const db = require('../models')
const app = express.Router()
const BLOG = require('../app/Controllers/BlogController')

// import authorization middleware
const token = require('../middlewares/verifyToken')
// app.get("/all", (req, res) => {
//     db.blog.findAll({}).then(result => {
//         res.json(["data", result]);
//     });
// });

app
    .get('/all',BLOG.list_all)

    .get('/all/Category/:category',BLOG.list_Category)

    .get('/all/Title/:title',BLOG.list_Title)

    .get('/:id',BLOG.blog_detail)

    .get('/User/:user',BLOG.blog_User)

    // apply middleware for protection
    .use((req,res,next)=>token(req,res,next))

    .post('/New',BLOG.New_blog)

    .put('/Update/:id',BLOG.Update_blog)

    .delete('/Delete/:id',BLOG.Delete_blog)

    .post('/Favorite', BLOG.Add_favorite)

    .get('/get/Favorite/:id', BLOG.get_favorite)

module.exports = app;