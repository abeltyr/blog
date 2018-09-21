// this is the entry point for the app env variables are set automatically
// node modules
const bodyParser = require('body-parser')
const express = require('express')
const blog = require('./routes/blog')
const feedback = require('./routes/feedback')
const follow = require('./routes/follow')
const user = require('./routes/user')


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

// plug the routers here for the individual components
app.use('/api/blog', blog)
app.use('/api/feedback', feedback)
app.use('/api/', follow)


app.use('/user', user)

// Start listening for connections
app.listen(process.env.APP_PORT ? process.env.APP_PORT : 3000, (err) => {
    if (err) debug("can't start the app")
    debug(`starting ${process.env.APP_NAME} on port ${process.env.APP_PORT}`)
})