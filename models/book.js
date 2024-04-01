const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
    title: { type: String, required: true },
    thumbnail: { type: String },
    author: { type: String, required: true },
    excerpt: { type: String, required: true },
    content: { type: String, required: true },
    genres: { type: [String], required: true },
    status: { type: String, enum: ['Available', 'Unavailable'], default: 'Available' }
}, { timestamps: true });

const Book = mongoose.model('Book', bookSchema);

module.exports = Book;
