const express = require("express");
const cors = require('cors')

// App & Middleware
const app = express()

// parse json request body
app.use(express.json());

// parse urlencoded request body
app.use(
    express.urlencoded({
        extended: true
    })
);

// enable cors 
const corsOptions = {
    exposedHeaders: ['x-auth-token'],
    origin: '*',
    credentials: true,
    methods: ['GET', 'POST', 'DELETE']
};
app.use(cors(corsOptions))

module.exports = app