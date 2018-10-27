const models = require('../db/models');
const apiConfig = require('../db/collections');
const httpStatus = require('http-status-codes');
const messages = require('./messages');

function checkOperation(collectionName, operation) {
    let collectionConfig = apiConfig.collections.find((collection) => collection.name === collectionName);

    if (!collectionConfig) {
        let err = new Error(messages.COLLECTION_NOT_EXIST(collectionName));
        err.status = httpStatus.NOT_FOUND;
        return err;
    }
    if (!collectionConfig.operations[operation]) {
        let err = new Error(messages.OPERATION_NOT_ALLOWED(collectionName));
        err.status = httpStatus.METHOD_NOT_ALLOWED;
        return err;
    }
    return null;
}

module.exports = {
    getDocs(req, res, next) {
        // TODO: Generate API Doc
        res.send(Object.keys(models));
    },

    create(req, res, next) {
        const collectionName = req.params.collection;

        const opErr = checkOperation(collectionName, 'create');
        if (opErr) throw opErr;

        const Model = models[collectionName];
        const props = req.body;
        Model.create(props)
            .then(records => {
                res.send(records)
            })
            .catch((err) => {
                console.log("failed", err);
                throw err;
            });
    },

    edit(req, res, next) {
        const collectionName = req.params.collection;

        const opErr = checkOperation(collectionName, 'update');
        if (opErr) throw opErr;

        const Model = models[collectionName];
        if (!Model) {
            throw new Error(messages.COLLECTION_NOT_EXIST(collectionName));
        }
        const recordId = req.params.id;
        const props = req.body;

        Model.findByIdAndUpdate({_id: recordId}, props)
            .then(() => Model.findById({_id: recordId}))
            .then(record => res.send(record))
            .catch(next);
    },

    delete(req, res, next) {
        const collectionName = req.params.collection;

        const opErr = checkOperation(collectionName, 'delete');
        if (opErr) throw opErr;

        const Model = models[collectionName];
        if (!Model) {
            throw new Error(messages.COLLECTION_NOT_EXIST(collectionName));
        }

        Model.findByIdAndRemove({ _id: req.params.id })
            .then(driver => res.status(httpStatus.NO_CONTENT).send(driver))
            .catch(next);
    },

    // list all records with pagination
    list(req, res, next) {
        const collectionName = req.params.collection;

        const opErr = checkOperation(collectionName, 'retrieve');
        if (opErr) throw opErr;

        const Model = models[collectionName];
        if (!Model) {
            throw new Error(messages.COLLECTION_NOT_EXIST(collectionName));
        }
        Model.find()
            .then(records => res.send(records))
            .catch(next);
    }

};
