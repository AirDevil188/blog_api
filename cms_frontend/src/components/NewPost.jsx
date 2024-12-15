import { useEffect, useState } from "react";
import styles from "../components/NewPost.module.css";
import NewPostCard from "./NewPostForm";
import { useNavigate, useOutletContext, useParams } from "react-router-dom";

const NewPost = () => {
  const params = useParams();
  const {
    userObject: [userObject],
    errors: [errors, setErrors],
  } = useOutletContext();
  const navigate = useNavigate();
  const [edit, setEdit] = useState(null);
  const [isFetching, setIsFetching] = useState(false);

  useEffect(() => {
    setIsFetching(true);

    const fetchPost = async () => {
      setIsFetching(true);
      if (isFetching) {
        if (Object.hasOwn(params, "id")) {
          const response = await fetch(
            `http://localhost:3000/posts/post/update/${params.id}`,
            {
              mode: "cors",
              method: "GET",
              headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + userObject.token,
              },
            }
          );
          const data = await response.json();
          if (response.ok) {
            setEdit(data);
            return;
          }
          setErrors(data);
        }
      } else return;
    };
    fetchPost();
  }, [isFetching]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const text = formData.get("text");
    const response = await fetch(`http://localhost:3000/posts/create-post`, {
      mode: "cors",
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + userObject.token,
      },
      body: JSON.stringify({
        title: formData.get("title"),
        text: text,
      }),
    });
    const data = await response.json();
    if (response.ok) {
      navigate("/");
      return;
    }
    setErrors({ message: data.message });
  };

  const handleEdit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const response = await fetch(
      `http://localhost:3000/posts/post/update/${params.id}`,
      {
        mode: "cors",
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + userObject.token,
        },
        body: JSON.stringify({
          title: formData.get("title"),
          text: formData.get("text"),
        }),
      }
    );
    const data = await response.json();
    if (response.ok) {
      navigate("/");
      return;
    }
    setErrors({
      message: data.message,
    });
  };

  return (
    <>
      <section className={styles.newPostSection}>
        <NewPostCard
          errors={errors}
          handleSubmit={edit ? handleEdit : handleSubmit}
          edit={edit}
        />
      </section>
    </>
  );
};

export default NewPost;
