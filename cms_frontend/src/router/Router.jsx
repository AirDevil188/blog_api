import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "../App";
import LogIn, { handleSubmitLogIn } from "../components/Log-In";
import NewPost, { handleAction } from "../components/NewPost";
import NewCategory, { handleCategorySubmit } from "../components/NewCategory";
import Posts, { handleSubmit } from "../components/Posts";
import PostDetails, { handleDelete } from "../components/PostDetails";
import { getCategories, getPost, getPosts, updatePost } from "../utils/loaders";
import Error from "../components/ErrorElement";
import UpdatePost, { handleUpdateAction } from "../components/UpdatePost";

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
          loader: getCategories,
          action: handleAction,
        },

        {
          path: "/posts/post/update/:id",
          element: <UpdatePost />,
          loader: updatePost,
          action: handleUpdateAction,
        },
        {
          path: "/posts/post/:id",
          element: <PostDetails />,
          loader: getPost,
          action: handleDelete,
        },

        {
          path: "/new-category",
          element: <NewCategory />,
          action: handleCategorySubmit,
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
