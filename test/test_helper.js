const mongoose = require('mongoose');

// Connect to a test collection in the test environment
before(done => {
    mongoose.connect('mongodb://localhost/api_test', { useNewUrlParser: true });
    mongoose.connection
        .once('open', () => done())
        .on('error', err => {
            console.warn('Warning', err);
        });
});

after("Destroy test collections", done => {
    const collections = mongoose.connection.collections;
    let collectionNames = Object.keys(collections);
    Promise.all(collectionNames.map(name => collections[name].drop()))
        .then(() => done())
        .catch((err) => done(err));
});