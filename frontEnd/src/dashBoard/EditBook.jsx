import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Button, Label, TextInput, Textarea, Alert } from "flowbite-react";
import axios from "axios";

const EditBook = () => {
  const { id } = useParams();
  console.log('Book ID:', id);

  const bookCategories = [
    "Action", "Adventure", "Biography", "Business", "Children", "Comics",
    "Cookbooks", "Crime", "Fantasy", "Fiction", "History", "Horror",
    "Kids", "Learning", "Medical", "Mystery", "Non-Fiction", "Poetry",
    "Religion", "Romance", "Science", "Science Fiction", "Self-Help",
    "Sports", "Thriller", "Travel", "Young Adult"
  ];

  const [bookData, setBookData] = useState({
    bookTitle: "",
    author: "",
    imgUrl: "",
    category: bookCategories[0],
    bookDescription: "",
    bookPdfUrl: ""
  });
  const [alertMessage, setAlertMessage] = useState(null);
  const [alertType, setAlertType] = useState(null);

  useEffect(() => {
    // Fetch the book data
    axios.get(`http://localhost:3000/books/${id}`)
      .then(response => {
        const book = response.data;
        console.log('Fetched Book Data:', book);
        setBookData(book);
      })
      .catch(error => {
        console.error('Error fetching book data:', error);
        setAlertMessage("Error fetching book data.");
        setAlertType("error");
      });
  }, [id]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setBookData({ ...bookData, [name]: value });
  };

  // Handle book update submission
  const handleUpdate = async (event) => {
    event.preventDefault();
    try {
      await axios.patch(`http://localhost:3000/books/${id}`, bookData);
      setAlertMessage("Book updated successfully!");
      setAlertType("success");
    } catch (error) {
      console.error('Error updating book:', error);
      setAlertMessage("Error updating book.");
      setAlertType("error");
    }
  };

  return (
    <div className="px-4 my-12">
      <h2 className="mb-8 text-3xl font-bold">Update A Book</h2>

      {/* Alert message */}
      {alertMessage && (
        <Alert color={alertType === "success" ? "green" : "red"}>{alertMessage}</Alert>
      )}

      <form onSubmit={handleUpdate} className="flex lg:w-[1180px] flex-col flex-wrap gap-4">
        {/* First row: Book Title and Author */}
        <div className="flex gap-8">
          <div className="lg:w-1/2">
            <Label htmlFor="bookTitle" value="Book Title" />
            <TextInput
              id="bookTitle"
              name="bookTitle"
              type="text"
              placeholder="Book name"
              required
              value={bookData.bookTitle}
              onChange={handleChange}
            />
          </div>
          <div className="lg:w-1/2">
            <Label htmlFor="author" value="Author" />
            <TextInput
              id="author"
              name="author"
              type="text"
              placeholder="Author"
              required
              value={bookData.author}
              onChange={handleChange}
            />
          </div>
        </div>

        {/* Second row: Image URL and Category */}
        <div className="flex gap-8">
          <div className="lg:w-1/2">
            <Label htmlFor="imgUrl" value="Book Image URL" />
            <TextInput
              id="imgUrl"
              name="imgUrl"
              type="text"
              placeholder="Book image URL"
              required
              value={bookData.imgUrl}
              onChange={handleChange}
            />
          </div>
          <div className="lg:w-1/2">
            <Label htmlFor="category" value="Book Category" />
            <select
              name="category"
              id="category"
              className="w-full rounded"
              value={bookData.category}
              onChange={handleChange}
            >
              {bookCategories.map((category, index) => (
                <option key={index} value={category}>{category}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Book Description */}
        <div>
          <Label htmlFor="bookDescription" value="Book Description" />
          <Textarea
            name="bookDescription"
            id="bookDescription"
            placeholder="Write book description"
            sizing="lg"
            required
            rows={6}
            value={bookData.bookDescription}
            onChange={handleChange}
          />
        </div>

        {/* Book PDF URL */}
        <div>
          <Label htmlFor="bookPdfUrl" value="Book PDF URL" />
          <TextInput
            id="bookPdfUrl"
            name="bookPdfUrl"
            type="text"
            placeholder="Book PDF URL"
            required
            value={bookData.bookPdfUrl}
            onChange={handleChange}
          />
        </div>

        <Button type="submit" className="mt-5">Update Book</Button>
      </form>
    </div>
  );
}

export default EditBook;