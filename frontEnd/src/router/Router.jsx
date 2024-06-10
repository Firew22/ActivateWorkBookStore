import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import App from '../App'
import Home from "../Home/Home";
import Shop from "../Shop/Shop";
import About from "../components/About";
import Blog from "../components/Blog";
import SingleBook from "../components/SingleBook";


const router = createBrowserRouter([
  {
    path: "/",
    element: <App/>,
    children:[{
        path: "/",
        element: <Home/>
    },
    {
        path: "/Shop",
        element: <Shop/>
    },
    {
        path: "/About",
        element: <About/>
    },{
      path: "/Blog",
      element: <Blog/>
    },{
      
    }
]
  },
]);
export default router;