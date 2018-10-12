const controller = require('../controllers');

module.exports = (app) => {
    app.get('/api', controller.getDocs);

    // create a record
    app.post('/api/:collection', controller.create);

    // modify a record
    app.put('/api/:collection/:id', controller.edit);

    // delete a record
    app.delete('/api/:collection/id', controller.delete);

    // get a list of records
    app.get('/api/:collection', controller.list);
};