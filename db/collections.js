module.exports = {
    collections : [
        {
            name: 'users', //a unique lowercase name for the collection
            operations:["create","retrieve","update","delete"], // TODO
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