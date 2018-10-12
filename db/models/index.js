const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const _ = require('lodash');
const collectionData = require('../collections');

const models = collectionData.collections.map(collection => {
    return mongoose.model(collection.name, new Schema(collection.schema))
});

module.exports = _.mapKeys(models, "modelName");