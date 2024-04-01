const Book = require('../models/book');

exports.getAllBooks = async (req, res) => {
    try {
        const books = await Book.find(); ``
        res.status(200).json(books);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getBookById = async (req, res) => {
    try {
        const book = await Book.findById(req.params.id);
        if (!book) {
            return res.status(404).json({ message: 'Book not found' });
        }
        res.status(200).json(book);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.addBook = async (req, res) => {
    try {
        console.log(req.body);
        if (req.user.role !== 'Librarian') {
            return res.status(403).json({ message: 'You are not authorized to add books' });
        }

        const { title, author, excerpt, content, genres, thumbnail } = req.body;
        const book = new Book({ title, author, excerpt, content, genres, thumbnail });
        await book.save();
        res.status(201).json({ message: 'Book added successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.updateBook = async (req, res) => {
    try {
        console.log(req.body);
        if (req.user.role !== 'Librarian') {
            return res.status(403).json({ message: 'You are not authorized to update books' });
        }

        const { title, author, excerpt, content, genres, thumbnail } = req.body;
        const updatedBook = await Book.findByIdAndUpdate(req.params.id, { title, author, excerpt, content, genres, thumbnail });
        if (updatedBook) {

            res.status(200).json({ message: 'Book updated successfully', updatedBook });
        } else {
            res.status(404).json({ message: "Book not found" });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.deleteBook = async (req, res) => {
    try {
        if (req.user.role !== 'Librarian') {
            return res.status(403).json({ message: 'You are not authorized to delete books' });
        }

        const deletedBook = await await Book.findByIdAndDelete(req.params.id);
        if (deletedBook) {

            res.status(200).json({ message: 'Book deleted successfully', deletedBook });
        } else {
            res.status(404).json({ message: "Book not found" });
        }

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
