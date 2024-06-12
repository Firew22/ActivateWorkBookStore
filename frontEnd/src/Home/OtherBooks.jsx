import React,{useEffect, useState} from 'react'
import BookCards from '../components/BookCards';
import axios from 'axios';



const OtherBooks = () => {

 const [books, setBooks] = useState([]);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await axios.get('http://localhost:3000/books');
        setBooks(response.data.slice(4,10));
        console.log('this is:'+ response.data);
      } catch (error) {
        console.error('Error fetching the books:', error);
      }
    };

    fetchBooks();
  }, []);

  return (
    <div>
      <BookCards books={books} headline="Other Books" />
    </div>
  );
};


export default OtherBooks