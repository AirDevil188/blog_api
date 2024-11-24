import { useEffect, useState, useContext } from "react";
import { useOutletContext, useParams } from "react-router-dom";

const PostDetails = () => {
  const params = useParams();
  const [userObject, setUserObject] = useOutletContext();
  const [data, setData] = useState(null);
  const [isFetching, setIsFetching] = useState(false);
  const [errors, setErrors] = useState(null);

  const fetchPostDetails = async () => {
    setIsFetching(true);
    if (isFetching) {
      try {
        const response = await fetch(
          `http://localhost:3000/posts/post/${params.id}`,
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
          setData(data);
        }
        setErrors(data.message);
      } catch (err) {
        console.log(err);
        return err;
      }
    }
  };

  useEffect(() => {
    fetchPostDetails();
  }, [isFetching]);

  return (
    <>
      {data ? (
        <article className="post-details">
          <section className="post-details-title">
            <h3>{data.title}</h3>
          </section>
          <section className="post-details">
            <div className="post-user">
              <small>{data.userId}</small>
            </div>
            <div className="post-createdAt">
              <small>{data.createdAt}</small>
            </div>
          </section>
          <section className="post-text">
            <p>{data.text}</p>
          </section>
        </article>
      ) : null}
      {errors ? (
        <>
          <section className="errors-section">
            <p>{errors}</p>
          </section>
        </>
      ) : null}
    </>
  );
};

export default PostDetails;
