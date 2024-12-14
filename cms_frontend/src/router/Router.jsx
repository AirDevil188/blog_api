import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "../App";
import LogIn from "../components/Log-In";
import NewPost from "../components/NewPost";
import Posts from "../components/Posts";

const Router = () => {
  const router = createBrowserRouter([
    {
      element: <App />,
      path: "/",
      children: [
        {
          path: "/",
          element: <Posts />,
        },
        {
          path: "/log-in",
          element: <LogIn />,
        },
        {
          path: "/new-post",
          element: <NewPost />,
        },

        {
          path: "/posts/post/update/:id",
          element: <NewPost />,
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
