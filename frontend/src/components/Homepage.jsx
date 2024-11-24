import { useEffect, useState } from "react";
import Posts from "./Posts";
import { useOutletContext } from "react-router-dom";

const Homepage = () => {
  const { userObject, setUserObject } = useOutletContext();
  const [posts, setPosts] = useState(null);

  const fetchPOSTS = async () => {
    const response = await fetch("http://localhost:3000/posts", {
      mode: "cors",
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });
    const data = await response.json();
    setPosts(data);
  };

  useEffect(() => {
    fetchPOSTS();
  }, []);

  return (
    <>
      <Posts posts={posts} />
    </>
  );
};

export default Homepage;
