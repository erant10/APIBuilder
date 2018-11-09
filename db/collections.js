module.exports = {
    collections : [
        {
            name: 'drivers',
            description: 'A collection of drivers',
            operations: {
                create: true,
                retrieve: true,
                update: true,
                delete: true
            },
            properties: {
                email: {
                    type: String,
                    required: true
                },
                driving: {
                    type: Boolean,
                    default: false
                },
                geometry: {
                    type: { type: String },
                    coordinates: { type: [Number], index: '2dsphere' }
                },
                vehicles: [{
                    manufacturer: { type: String },
                    yearOfManufacture: { type: Number }
                }]
            }
        }
        // {
        //     name: 'user',
        //     description: 'A collection of users',
        //     operations: {
        //         create: true,
        //         retrieve: true,
        //         update: true,
        //         delete: true
        //     },
        //     schema: {
        //         name: {
        //             type: String,
        //             required: [true, 'Name is required.'],
        //             validate: {
        //                 validator: (name) => name.length > 2,
        //                 message: 'Name must be longer than 2 characters.'
        //             }
        //         },
        //         email: {
        //             type: String,
        //             required: true
        //         },
        //         posts: [{
        //             title: String,
        //             body: String
        //         }],
        //         likes: {
        //             type: Number,
        //             default: 0
        //         },
        //         blogPosts: [{
        //             type: Schema.Types.ObjectId,
        //             ref: 'post'
        //         }]
        //     }
        // },
        // {
        //     name: 'post',
        //     description: 'A collection of blog posts',
        //     operations: {
        //         create: true,
        //         retrieve: true,
        //         update: true,
        //         delete: true
        //     },
        //     schema: {
        //         title: String,
        //         content: String,
        //         comments: [{
        //             type: Schema.Types.ObjectId,
        //             ref: 'comment'
        //         }]
        //     }
        // },
        // {
        //     name: 'comment',
        //     description: 'A collection of comments',
        //     operations: {
        //         create: true,
        //         retrieve: true,
        //         update: true,
        //         delete: true
        //     },
        //     schema: {
        //         content: String,
        //         user: {
        //             type: Schema.Types.ObjectId,
        //             ref: 'user'
        //         }
        //     }
        // },
        // {
        //     name: 'album',
        //     description: 'A collection of albums',
        //     operations: {
        //         create: true,
        //         retrieve: true,
        //         update: true,
        //         delete: true
        //     }
        // },
        // {
        //     name: 'artist',
        //     description: 'A collection of artists',
        //     operations: {
        //         create: true,
        //         retrieve: true,
        //         update: true,
        //         delete: true
        //     },
        //     schema: {
        //         name: String,
        //         age: Number,
        //         yearsActive: Number,
        //         image: String,
        //         genre: String,
        //         website: String,
        //         netWorth: Number,
        //         labelName: String,
        //         retired: Boolean,
        //         albums: [{
        //             title: String,
        //             date: Date,
        //             copiesSold: Number,
        //             numberTracks: Number,
        //             image: String,
        //             revenue: Number
        //         }]
        //     }
        // }

    ]
};