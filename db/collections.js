module.exports = {
    collections : [
        {
            name: 'users', //a unique lowercase name for the collection
            operations: {
                create: true,
                retrieve: true,
                update: true,
                delete: true
            },
            schema: {
                name: {
                    type: String,
                    required: true
                },
                email: {
                    type: String,
                    required: true
                },
                birthYear: {
                    type: Number,
                    required: false
                }
            }
        }
    ]
};