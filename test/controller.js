const assert = require('assert');
const request = require('supertest');
const app = require('../app');
const mongoose = require('mongoose');

const allowedCollectionName = 'allow_all_test';
const notAllowedCollectionName = 'allow_none_test';

const AllowedModel = mongoose.model(allowedCollectionName);
const NotAllowedModel = mongoose.model(notAllowedCollectionName);

describe('Test controller functions', () => {

    it('Call an operation on a non-existing collection', done => {
        request(app).get('/api/my_non_collection')
            .end((err,response) => {
                assert(response.statusCode === 404);
                done();
            });
    });

    it('Calling \'create\' on a collection that does\'nt allow creating records', (done) => {
        NotAllowedModel.count()
            .then(count => {
                request(app)
                    .post(`/api/${notAllowedCollectionName}`)
                    .send({ b: 'hello hello' })
                    .end((err, response) => {
                        NotAllowedModel.count().then(newCount => {
                            assert(count === newCount && response.statusCode === 405);
                            done();
                        });
                    });
            });
    });

    it('Create a record', (done) => {
        AllowedModel.count()
            .then(count => {
                request(app)
                    .post(`/api/${allowedCollectionName}`)
                    .send({ a: 'hello hello' })
                    .end(() => {
                        AllowedModel.count().then(newCount => {
                            assert(count + 1 === newCount);
                            done();
                        });
                    });
            });
    });

    it('Calling \'retrieve\' on a collection that doesn\'t allow retrieving records', (done) => {
        request(app)
            .get(`/api/${notAllowedCollectionName}`)
            .end((err, response) => {
                assert(response.statusCode === 405);
                done();
            });

    });

    it('Retrieve a record', (done) => {
        const newRecord = new AllowedModel({a: "hello"});
        newRecord.save()
            .then(() => {
                AllowedModel.count()
                    .then(count => {
                        request(app)
                            .get(`/api/${allowedCollectionName}`)
                            .end((err, response) => {
                                assert(response.body.length === count)
                                done();
                            });
                    })

            });
    });

    it('Calling \'update\' on a collection that doesn\'t allow updating records', (done) => {
        request(app)
            .put(`/api/${notAllowedCollectionName}/someID`)
            .send({ a: 'hello hello' })
            .end((err, response) => {
                assert(response.statusCode === 405);
                done();
            });
    });

    it('Update a record', (done) => {
        const newRecord = new AllowedModel({a: "a@a.com", b: "hello world"});
        newRecord.save()
            .then(() => {
                request(app)
                    .put(`/api/${allowedCollectionName}/${newRecord._id}`)
                    .send({ b: 'goodbye world' })
                    .end((err, response) => {
                        AllowedModel.findOne({a: "a@a.com"})
                            .then(record => {
                                assert(record.b === "goodbye world")
                                done();
                            });
                    });
            })

    });

    it('Calling \'delete\' on a collection that doesn\'t allow deleting records', (done) => {
        request(app)
            .delete(`/api/${notAllowedCollectionName}/someID`)
            .end((err, response) => {
                assert(response.statusCode === 405);
                done();
            });
    });

    it('Delete a record', (done) => {
        const newRecord = new AllowedModel({a: "a@a.com", b: "hello world"});

        newRecord.save().then(() => {
            request(app)
                .delete(`/api/${allowedCollectionName}/${newRecord._id}`)
                .end(() => {
                    AllowedModel.findOne({ a: "a@a.com" })
                        .then( (record) => {
                            assert(record === null);
                            done();
                        })

                })
        });
    });


});