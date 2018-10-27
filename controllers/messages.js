module.exports = {
    COLLECTION_NOT_EXIST: (collectionName) => `The collection ${collectionName} does not exist`,
    OPERATION_NOT_ALLOWED: (collectionName) => `This operation is not permitted on the collection '${collectionName}'`
}