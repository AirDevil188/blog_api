import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "../App";
import Homepage from "../components/Homepage";
import LogIn from "../components/Log-In";
import SignUp from "../components/Sign-up";
import PostDetails, { handleSubmit } from "../components/PostDetails";
import { getPostAndComments, getPosts } from "../utils/loaders";

const Router = () => {
  const router = createBrowserRouter(
    [
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
            loader: getPosts,
          },
          {
            path: "/sign-up",
            element: <SignUp />,
          },
          {
            path: "/posts/post/:id",
            element: <PostDetails />,
            loader: getPostAndComments,
            action: handleSubmit,
          },
        ],
      },
    ],
    {}
  );
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
};

export default Router;
