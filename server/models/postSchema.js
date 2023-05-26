const mongoose = require('mongoose')

const PostSchema = new mongoose.Schema({
    title: {
        type: String,
    },
    image: {
        type: String,
    },
    imageUrl: {
        type: String
    }
})

module.exports = mongoose.model('Post', PostSchema)