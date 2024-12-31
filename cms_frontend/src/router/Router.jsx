import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "../App";
import LogIn, { handleSubmitLogIn } from "../components/Log-In";
import NewPost, { handleAction } from "../components/NewPost";
import Posts, { handleSubmit } from "../components/Posts";
import PostDetails, { handleDelete } from "../components/PostDetails";
import { getPost, getPosts, updatePost } from "../utils/loaders";
import Error from "../components/ErrorElement";

const Router = () => {
  const router = createBrowserRouter([
    {
      element: <App />,
      errorElement: <Error />,
      path: "/",
      children: [
        {
          path: "/",
          element: <Posts />,
          loader: getPosts,
          action: handleSubmit,
        },
        {
          path: "/log-in",
          element: <LogIn />,
          action: handleSubmitLogIn,
        },
        {
          path: "/new-post",
          element: <NewPost />,
          action: handleAction,
        },

        {
          path: "/posts/post/update/:id",
          element: <NewPost />,
          loader: updatePost,
          action: handleAction,
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
