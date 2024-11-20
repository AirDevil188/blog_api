import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "../App";
import Homepage from "../components/Homepage";
import LogIn from "../components/Log-In";
import SignUp from "../components/Sign-up";

const Router = () => {
  const router = createBrowserRouter([
    {
      element: <App />,
      path: "/",
      children: [
        {
          path: "/log-in",
          element: <LogIn />,
        },
        {
          path: "/",
          element: <Homepage />,
        },
        {
          path: "/sign-up",
          element: <SignUp />,
        },
      ],
    },
  ]);
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
};

export default Router;
