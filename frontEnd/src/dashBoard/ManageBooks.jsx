import React, { useEffect, useState } from 'react';
import { Table, Spinner } from "flowbite-react";
import { Link } from 'react-router-dom';

const ManageBooks = () => {
  const [allBooks, setAllBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('http://localhost:3000/books')
      .then(res => res.json())
      .then(data => {
        const booksWithDefaultPrice = data.map(book => ({
          ...book,
          price: book.price || 10.00  // Set default price to $10 if not already set
        }));
        setAllBooks(booksWithDefaultPrice);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching books:', error);
        setLoading(false);
      });
  }, []);
// delete books
const handleDelete = (id) =>{
  fetch(`http://localhost:3000/books/${id}`, {
    method: 'DELETE'
  })
   .then(res => res.json())
   .then(data => {
    alert("Book deleted")
      if (data.deletedCount === 1) {
        setAllBooks(allBooks.filter(book => book._id!== id));
      }
    })
   .catch(error => {
      console.error('Error deleting book:', error);
    });

}
  return (
    <div className='px-4 my-12'>
      <h2 className='mb-8 text-3xl font-bold'>Manage Books</h2>

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <Spinner size="xl" />
        </div>
      ) : (
        <Table className='lg:w-[1180px]'>
          <Table.Head>
            <Table.HeadCell>No</Table.HeadCell>
            <Table.HeadCell>Title</Table.HeadCell>
            <Table.HeadCell>Author</Table.HeadCell>
            <Table.HeadCell>Category</Table.HeadCell>
            <Table.HeadCell>Price</Table.HeadCell>
            <Table.HeadCell>Actions</Table.HeadCell>
          </Table.Head>
          <Table.Body className="divide-y">
            {allBooks.map((book, index) => (
              <Table.Row key={book._id} className="bg-white dark:border-gray-700 dark:bg-gray-800">
                <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                  {index + 1}
                </Table.Cell>
                <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                  {book.bookTitle}
                </Table.Cell>
                <Table.Cell>{book.author}</Table.Cell>
                <Table.Cell>{book.category}</Table.Cell>
                <Table.Cell>${book.price}</Table.Cell>
                <Table.Cell>
                  <Link
                    className="font-medium text-cyan-600 hover:underline dark:text-cyan-500 mr-5"
                    to={`/admin/dashboard/edit-books/${book._id}`}
                  >
                    Edit
                  </Link>
                  <button onClick={()=>handleDelete(book._id)} className='bg-red-600 px-4 font-semibold text-white rounded-sm
                  hover:bg-sky-600'>Delete</button>
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
      )}
    </div>
  );
};

export default ManageBooks;