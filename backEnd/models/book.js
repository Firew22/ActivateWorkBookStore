import mongoose from 'mongoose';

const bookSchema = new mongoose.Schema({
    bookTitle: {
        type: String,
        required: true,
    },
    author: {
        type: String,
        required: true,
    },
    imgUrl: {
        type: String,
        required: true,
    },
    category: {
        type: String,
        required: true,
    },
    bookDescription: {
        type: String,
        required: true,
    },
    bookPdfUrl: {
        type: String,
        required: true,
    },
});

const Book = mongoose.model('Book', bookSchema);

export default Book;