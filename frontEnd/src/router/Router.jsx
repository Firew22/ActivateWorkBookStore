import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import App from '../App';
import Home from "../Home/Home";
import Shop from "../Shop/Shop";
import About from "../components/About";
import Blog from "../components/Blog";
import SingleBook from "../Shop/SingleBook";
import DashboardLayout from '../dashBoard/DashboardLayout'
import DashBoard from '../dashBoard//DashBoard';
import UploadBooks from '../dashBoard/UploadBooks';
import ManageBooks from '../dashBoard/ManageBooks';
import EditBook from '../dashBoard/EditBook';

const router = createBrowserRouter([
    {
    path: '/',
    element: <App />,
    children: [
      { path: '/', element: <Home /> },
      { path: 'shop', element: <Shop /> },
      { path: 'about', element: <About /> },
      { path: 'blog', element: <Blog /> },
      { path: 'book/:id', element: <SingleBook />, loader: ({ params }) => fetch(`http://localhost:5173/book/${params.id}`) },
      {
        path: 'admin/dashboard',
        element: <DashboardLayout />,
        children: [
          { path: '', element: <DashBoard /> }, // Default path for "admin/dashboard"
          { path: 'upload', element: <UploadBooks /> },
          { path: 'manage', element: <ManageBooks /> },
          { path: 'edit-books/:id', element: <EditBook />, loader: ({ params }) => fetch(`http://localhost:5173/book/${params.id}`) }
        ]
      }
    ]
  }
]);


export default router;