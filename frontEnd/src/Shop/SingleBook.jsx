import React from 'react';
import { useLoaderData } from 'react-router-dom';

const SingleBook = () => {
  const book = useLoaderData();

  return (
    <div className='mt-28 px-4 lg:px-24'>
    <h2>{book.bookTitle}</h2>
    <img src={book.imgUrl} alt={book.bookTitle} className='h-96'/>
      
      <p>{book.author}</p>
        <p>{book.bookDescription}</p>
    </div>
  );
};

export default SingleBook;