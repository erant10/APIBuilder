module.exports = {
    collections : [
        {
            name: 'allow_all_test',
            description: 'A test collection for all operations',
            operations: {
                create: true,
                retrieve: true,
                update: true,
                delete: true
            },
            properties: {
                a: {
                    type: String
                },
                b: {
                    type: String
                }
            }
        },{
            name: 'allow_none_test',
            description: 'A test collection with no operations allowed',
            operations: {
                create: false,
                retrieve: false,
                update: false,
                delete: false
            },
            properties: {
                b: {
                    type: String
                }
            }
        }
    ]
};