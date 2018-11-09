const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const config = require('config');
const app = express();
app.use(bodyParser.json());

mongoose.Promise = global.Promise;
const DBConfig = config.get('DB');

if(process.env.NODE_ENV !== 'test') {
    const dbUserPrefix = DBConfig.USER ? `${DBConfig.USER}:${DBConfig.PASSWORD}@` : '';
    const dbConnectionURL = `mongodb://${dbUserPrefix}${DBConfig.SERVER_NAME}:${DBConfig.PORT}/${DBConfig.NAME}`;
    mongoose.connect(dbConnectionURL, {useNewUrlParser: true});
}
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