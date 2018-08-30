    // this is the entry point for the app env variables are set automatically
    // import the express app
    const express = require('express')
    //initialize the express app
    const app = express()
//  don't console.log, instead use the debug module

    //const debug = require('debug') ('')

    // debug('starting server ...')



    // add global middleware here

    app.get('/',(req,res)=>{
        res.send("this is the app")
    })





// Start listening for connections
    app.listen(process.env.APP_PORT? process.env.APP_PORT : 3000, (err)=>{
        if (err) console.log("can't start the app")
        console.log(`starting ${process.env.APP_NAME} on port ${process.env.APP_PORT}`)
    })