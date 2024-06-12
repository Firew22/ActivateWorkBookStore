import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Card } from 'flowbite-react';

const Shop = () => {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await axios.get('http://localhost:3000/books');
        setBooks(response.data.slice(0, 8));
        console.log(response.data);
      } catch (error) {
        console.error('Error fetching the books:', error);
      }
    };

    fetchBooks();
  }, []);

  return (
    <div className='mt-28 px-4 lg:px-24'>
      <h2 className='text-5xl font-bold text-center'>All Books are Here</h2>
      <div className='grid lg:grid-cols-4 sm:grid-cols-2 md:grid-cols-3 grid-cols-1 gap-8 my-12'>
        {books.map((book) => (
          <Card key={book._id}>
            <img src={book.imgUrl} alt="book cover image" className=''/>
            <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
              {book.bookTitle}
            </h5>
            <p className="font-normal text-gray-700 dark:text-gray-400">
              {book.bookDescription}
            </p>
            <button className='bg-blue-700 font-semibold text-white py-2 rounded'>Buy Now</button>
          </Card>
        ))}
      </div>
    </div>
  );
}

export default Shop;
