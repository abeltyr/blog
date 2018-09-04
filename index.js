// this is the entry point for the app env variables are set automatically
// node modules
const bodyParser = require('body-parser')
const express = require('express')

// middleware
const security = require('./middlewares/security')


    //initialize the express app
const app = express()
//  don't console.log, instead use the debug module
const debug = require('debug')('app')
debug('starting server ...')

// apply security middleware
security(app)

    // parse the body of the incoming body req
app.use(bodyParser.json())

const blog = require('./route/blog')

app.use('/blog',blog)

    // plug the routers here for the individual components

app.get('/', (req,res)=>{
    res.send()
})



// Start listening for connections
    app.listen(process.env.APP_PORT? process.env.APP_PORT : 3000, (err)=>{
        if (err) debug("can't start the app")
        debug(`starting ${process.env.APP_NAME} on port ${process.env.APP_PORT}`)
    })