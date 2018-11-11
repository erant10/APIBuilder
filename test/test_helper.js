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

beforeEach("Destroy test collections", async () => {
    const collections = await mongoose.connection.db.collections();

    for (let collection of collections) {
        await collection.deleteOne();
    }
});