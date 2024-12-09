import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "../App";
import LogIn from "../components/Log-In";

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
