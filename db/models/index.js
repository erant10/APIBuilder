const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const _ = require('lodash');

function isObject(arg) {
    return arg !== null && typeof arg === 'object';
}

function buildSchema(props) {
    let schemaProps = _.mapValues(props, prop => {
        if (isObject(prop.type)) {
            if (prop.type instanceof Array) {
                if (isObject(prop.type[0])) {
                    // this is an array of a nested schema - call recursively
                    return [buildSchema(prop.type[0])];
                } else {
                    return prop
                }
            } else {
                // a nested schema
                return buildSchema(prop.type)
            }
        } else return prop
    });
    return new Schema(schemaProps)
}

module.exports = collectionData => {
    return _.mapKeys(
        collectionData.collections.map(collection => {
            return mongoose.model(collection.name, buildSchema(collection.properties))
        }),
        "modelName"
    );
};