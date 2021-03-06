'use strict';

// load modules
const express = require('express');
const morgan = require('morgan');
const routes = require('./routes.js')
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

// variable to enable global error logging
const enableGlobalErrorLogging = process.env.ENABLE_GLOBAL_ERROR_LOGGING === 'true';

// create the Express app
const app = express();

// Body Parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// setup morgan which gives us http request logging
app.use(morgan('dev'));

//Enable cors for all request
app.use(cors());

// mongodb connection
mongoose.connect("mongodb://localhost:27017/fsjstd-restapi", { useNewUrlParser: true})
var db = mongoose.connection;

db.on("error", function(){
  console.log("Task cannot be preformed. DB did not connect")
})

db.once("open", function(){
  console.log("Task completed. DB has connected")
})

app.use('/api', routes)

// TODO setup your api routes here

// setup a friendly greeting for the root route
app.get('/', (req, res) => {
  res.json({
    message: 'Welcome to the REST API project!',
  });
});

// send 404 if no other route matched
app.use((req, res) => {
  res.status(404).json({
    message: 'Route Not Found',
  });
});

// setup a global error handler
app.use((err, req, res, next) => {
  if (enableGlobalErrorLogging) {
    console.error(`Global error handler: ${JSON.stringify(err.stack)}`);
  }

  res.status(err.status || 500).json({
    message: err.message,
    error: {},
  });
});

// set our port
app.set('port', process.env.PORT || 5000);

// start listening on our port
const server = app.listen(app.get('port'), () => {
  console.log(`Express server is listening on port ${server.address().port}`);
});