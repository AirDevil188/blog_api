import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "../App";
import LogIn from "../components/Log-In";
import NewPost from "../components/NewPost";
import Posts from "../components/Posts";
import PostDetails, { handleDelete } from "../components/PostDetails";
import { getPost, getPosts } from "../utils/loaders";

const Router = () => {
  const router = createBrowserRouter([
    {
      element: <App />,
      path: "/",
      children: [
        {
          path: "/",
          element: <Posts />,
          loader: getPosts,
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
        {
          path: "/posts/post/:id",
          element: <PostDetails />,
          loader: getPost,
          action: handleDelete,
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
