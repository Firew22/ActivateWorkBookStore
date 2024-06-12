import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import App from '../App';
import Home from "../Home/Home";
import Shop from "../Shop/Shop";
import About from "../components/About";
import Blog from "../components/Blog";
import SingleBook from "../Shop/SingleBook";
import axios from 'axios';

const fetchBook = async ({ params }) => {
  try {
    const response = await axios.get(`http://localhost:3000/books/${params.id}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching the book:', error);
    throw new Error('Failed to fetch book');
  }
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/shop", element: <Shop /> },
      { path: "/about", element: <About /> },
      { path: "/blog", element: <Blog /> },
      {
        path: "/book/:id",
        element: <SingleBook />,
        loader: fetchBook,
      },
    ],
  },
]);

export default router;