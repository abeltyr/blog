// initialize express
const express = require('express')
// initialize the router for blog
const app = express.Router()
// import the models
const db = require('../models')

app.get('/create',(req,res)=>{
    res.send('this works')
})

module.exports = app