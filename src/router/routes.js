import Cart from "../pages/Cart";
import Home from "../pages/Home";
import NotFound from "../pages/NotFound";

export const publicRoutes = [
  { path: "/", element: <Home /> },
  { path: "*", element: <NotFound /> },
  { path: "/cart", element: <Cart /> },
];
