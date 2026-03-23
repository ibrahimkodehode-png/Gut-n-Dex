import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Home from "../pages/Home";
import Category from "../pages/Category";
import BookDetails from "../pages/BookDetails";
import Favorites from "../pages/Favorites";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "category/:topic",
        element: <Category />,
      },
      {
        path: "book/:id",
        element: <BookDetails />,
      },
      {
        path: "favorites",
        element: <Favorites />,
      },
    ],
  },
]);
