import { createRoot } from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
  Route,
} from "react-router-dom";
import Home from './components/Home';
import Login from './components/Login/Login';
import Signup from './components/Signup/Signup';
import AddProduct from './components/Product/AddProduct';
import LikedProducts from './components/Product/LikedProducts';
import ProductDetail from './components/Product/ProductDetail';
import CategoryPage from './components/CategoryPage';
import MyProducts from './components/Product/MyProducts';
import MyProfile from './components/MyProfile';
import EditProduct from './components/Product/EditProduct';
import Footer from './components/Footer';
import Admin from './components/Admin/Admin';
import DeleteProduct from './components/Admin/DeleteProduct';
import AHeader from './components/Admin/AHeader';
import User from './components/Admin/User';
import ProtectedRoutes from './components/Admin/ProtectedRoutes';
import Pagenotfound from './components/Admin/Pagenotfound';
import Aboutus from './components/Aboutus';


const router = createBrowserRouter([
  {
    path: "/",
    element: (<Home />),
  },
  {
    path: "/category/:catName",
    element: (<CategoryPage />),
  },
  {
    path: "/login",
    element: (<Login />),
  },
  {
    path: "/signup",
    element: (<Signup />),
  },
  {
    path: "/add-product",
    element: (<AddProduct />),
  },
  {
    path: "/edit-product/:productId",
    element: (<EditProduct />),
  },
  {
    path: "/liked-products",
    element: (<LikedProducts />),
  },
  {
    path: "/my-products",
    element: (<MyProducts />),
  },
  {
    path: "/product/:productId",
    element: (<ProductDetail />),
  },
  {
    path: "/my-profile",
    element: (<MyProfile />),
  },
  {
    path: "/about-us",
    element: (<Aboutus />),
  },
  // Protect only the Admin dashboard
  {
    path: "/admin",
    element: (<ProtectedRoutes Component={Admin} />),
  },
  // Other admin-related routes without protection
  {
    path: "/deleteproduct",
    element: (<ProtectedRoutes Component={DeleteProduct} />),
  },
  {
    path: "/aheader",
    element: (<ProtectedRoutes Component={AHeader} />),
  },
  {
    path: "/User",
    element: (<ProtectedRoutes Component={User} />),
  },
  {
    path: "/Pagenotfound",
    element: (<Pagenotfound />),
  },

]);

createRoot(document.getElementById("root")).render(
  <RouterProvider router={router} />
);


