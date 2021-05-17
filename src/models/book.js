const mongoose = require('mongoose')

const Book = mongoose.model('Book', {
    name: {
        type: String,
        required: true,
        trim: true
    },

    author: {
        type: String,
        required:true
        
    },
    price: {
        type:Number,
        required: true
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    }
})

module.exports = Book