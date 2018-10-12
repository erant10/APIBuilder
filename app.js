const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const config = require('config');
const app = express();
app.use(bodyParser.json());

mongoose.Promise = global.Promise;
const DBConfig = config.get('DB');

mongoose.connect(`mongodb://${DBConfig.HOST}:${DBConfig.PORT}/${DBConfig.NAME}`, { useNewUrlParser: true });

require('./routes')(app);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handler
app.use(function(err, req, res, next) {
    // render the error page
    res.status(err.status || 500);
    res.send({ error: err.message });
});

module.exports = app;