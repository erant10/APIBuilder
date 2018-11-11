const assert = require('assert');
let buildModels = require('./../db/models');

describe("Test Schema build", () => {

    describe("A flat schema", () => {
        let data = {
            collections: [
                {
                    name: 'item',
                    properties: {
                        str: { type: String },
                        bool: { type: Boolean },
                        arr: { type: [Number] },
                        num: { type: Number }
                    }
                }
            ]
        };
        let model;

        before(done => {
            model = buildModels(data);
            done();
        });

        it("flat schema built successfully", () => assert(typeof model !== "undefined"));

        it("model was built correctly from flat schema", (done) => {
            let Item = model.item;
            let props = {
                str: "aaa",
                bool: true,
                arr: [1,2,3],
                num: 30
            };
            Item.create(props)
                .then(record => {
                    assert(typeof record !== "undefined" && record.str === props.str);
                    done();
                })
                .catch(err => done(err));
        });

    });

    describe("A nested schema", () => {
        let data = {
            collections: [
                {
                    name: 'item2',
                    properties: {
                        str: { type: String },
                        bool: { type: Boolean },
                        objArr: {
                            type: [{
                                aaa: { type: String },
                                bbb: { type: [Number] }
                            }]
                        },
                        myObject: {
                            type: {
                                ccc: { type: String },
                                ddd: { type: Number }
                            }
                        }
                    }
                }
            ]
        };
        let model;

        before((done) => {
            model = buildModels(data);
            done();
        });

        it("nested schema built successfully", (done) => {
            assert(typeof model !== "undefined");
            done();
        });

        it("model was built correctly from nested schema", (done) => {
            let Item2 = model.item2;
            let props = {
                str: "hello",
                bool: true,
                objArr: [{
                    aaa: "1-3",
                    bbb: [1,2,3]
                },{
                    aaa: "4-6",
                    bbb: [4,5,6]
                },{
                    aaa: "7-9",
                    bbb: [7,8,9]
                }],
                myObject: {
                    ccc: "ccc",
                    ddd: 99
                }
            };
            Item2.create(props)
                .then(record => {
                    assert.deepStrictEqual(record.str, props.str);
                    done();
                })
                .catch(err => done(err));
        });
    });
});