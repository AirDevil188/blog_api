import { useEffect, useState } from "react";
import Posts from "./Posts";
import { useOutletContext } from "react-router-dom";

const Homepage = () => {
  const {
    userObject: [userObject, setUserObject],
    errors: [errors, setErrors],
  } = useOutletContext();
  const [posts, setPosts] = useState(null);

  const fetchPOSTS = async () => {
    const response = await fetch("http://localhost:3000/posts", {
      mode: "cors",
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });

    if (response.ok) {
      const data = await response.json();
      setPosts(data);
    }
    setErrors(errors);
  };

  useEffect(() => {
    fetchPOSTS();
  }, []);

  return <>{<Posts posts={posts} />}</>;
};

export default Homepage;
