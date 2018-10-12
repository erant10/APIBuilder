const models = require('../db/models');

const messages = {
    COLLECTION_NOT_EXIST: (collectionName) => `The collection ${collectionName} does not exist`
}

module.exports = {
    getDocs(req, res, next) {
        // TODO: Generate API Doc
        res.send(Object.keys(models));
    },

    create(req, res, next) {
        const collectionName = req.params.collection;
        const Model = models[collectionName];
        if (!Model) {
            throw new Error(messages.COLLECTION_NOT_EXIST(collectionName));
        }
        const props = req.body;
        Model.create(props)
            .then(records => {
                res.send(records)
            })
            .catch((err) => {
                console.log("failed", err);
                next();
            });
    },

    edit(req, res, next) {
        const collectionName = req.params.collection;
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
        const Model = models[collectionName];
        if (!Model) {
            throw new Error(messages.COLLECTION_NOT_EXIST(collectionName));
        }

        Model.findByIdAndRemove({ _id: req.params.id })
            .then(driver => res.status(204).send(driver))
            .catch(next);
    },

    // list all records with pagination
    list(req, res, next) {
        const collectionName = req.params.collection;
        const Model = models[collectionName];
        if (!Model) {
            throw new Error(messages.COLLECTION_NOT_EXIST(collectionName));
        }
        Model.find()
            .then(records => res.send(records))
            .catch(next);
    }

}
