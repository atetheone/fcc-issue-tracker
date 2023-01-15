'use strict';

const express     = require('express');
const cors        = require('cors');
const fccTestingRoutes  = require('./routes/fcctesting.js');
const { indexRouter } = require('./routes/index');
const { apiRouter } = require('./routes/api');

let app = express();

app.use('/public', express.static(process.cwd() + '/public'));

app.use(cors()); //For FCC testing purposes only

fccTestingRoutes(app);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use(indexRouter);


//Routing for API 
app.use(apiRouter);
    
//404 Not Found Middleware
app.use(function(req, res, next) {
  res.status(404)
    .type('text')
    .send('Not Found');
});


module.exports = app; //for testing
