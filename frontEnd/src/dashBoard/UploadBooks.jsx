import React, { useState } from "react";
import { Button, Label, TextInput, Textarea, Alert } from "flowbite-react";
import axios from "axios";

const UploadBooks = () => {
  const bookCategories = [
    "Action", "Adventure", "Biography", "Business", "Children", "Comics",
    "Cookbooks", "Crime", "Fantasy", "Fiction", "History", "Horror",
    "Kids", "Learning", "Medical", "Mystery", "Non-Fiction", "Poetry",
    "Religion", "Romance", "Science", "Science Fiction", "Self-Help",
    "Sports", "Thriller", "Travel", "Young Adult"
  ];

  const [selectedBookCategory, setSelectedBookCategory] = useState(bookCategories[0]);
  const [alertMessage, setAlertMessage] = useState(null);
  const [alertType, setAlertType] = useState(null);

  const handleChangeSelectedValue = (event) => {
    setSelectedBookCategory(event.target.value);
  };

  // Handle book submission
  const handleSubmit = async (event) => {
    event.preventDefault();
    const form = event.target;
    const bookObj = {
      bookTitle: form.bookTitle.value,
      author: form.author.value,
      imgUrl: form.imgUrl.value,
      category: form.category.value,
      bookDescription: form.bookDescription.value,
      bookPdfUrl: form.bookPdfUrl.value
    };
    console.log(bookObj);

    try {
      const response = await axios.post("http://localhost:3000/books/upload-book", bookObj, {
        headers: { "Content-Type": "application/json" }
      });
      console.log(response.data);
      setAlertMessage("Book uploaded successfully!");
      setAlertType("success");
      form.reset()
    } catch (error) {
      console.error('Error uploading the book:', error);
      setAlertMessage("Failed to upload the book.");
      setAlertType("error");
    }
  };

  return (
    <div className="px-4 my-12">
      <h2 className="mb-8 text-3xl font-bold">Upload A Book</h2>
      
      {/* Alert message */}
      {alertMessage && (
        <Alert color={alertType === "success" ? "green" : "red"}>{alertMessage}</Alert>
      )}
      
      <form onSubmit={handleSubmit} className="flex lg:w-[1180px] flex-col flex-wrap gap-4">
        {/* First row: Book Title and Author */}
        <div className="flex gap-8">
          <div className="lg:w-1/2">
            <Label htmlFor="bookTitle" value="Book Title" />
            <TextInput id="bookTitle" name="bookTitle" type="text" placeholder="Book name" required />
          </div>
          <div className="lg:w-1/2">
            <Label htmlFor="author" value="Author" />
            <TextInput id="author" name="author" type="text" placeholder="Author" required />
          </div>
        </div>

        {/* Second row: Image URL and Category */}
        <div className="flex gap-8">
          <div className="lg:w-1/2">
            <Label htmlFor="imgUrl" value="Book Image URL" />
            <TextInput id="imgUrl" name="imgUrl" type="text" placeholder="Book image URL" required />
          </div>
          <div className="lg:w-1/2">
            <Label htmlFor="category" value="Book Category" />
            <select name="category" id="category" className="w-full rounded" value={selectedBookCategory} onChange={handleChangeSelectedValue}>
              {bookCategories.map((category, index) => (
                <option key={index} value={category}>{category}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Book Description */}
        <div>
          <Label htmlFor="bookDescription" value="Book Description" />
          <Textarea name="bookDescription" id="bookDescription" type="text" placeholder="Write book description" sizing="lg" required rows={6} />
        </div>

        {/* Book PDF URL */}
        <div>
          <Label htmlFor="bookPdfUrl" value="Book PDF URL" />
          <TextInput id="bookPdfUrl" name="bookPdfUrl" type="text" placeholder="Book PDF URL" required />
        </div>

        <Button type="submit" className="mt-5">Upload Book</Button>
      </form>
    </div>
  );
};

export default UploadBooks;