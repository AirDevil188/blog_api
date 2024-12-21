import Posts from "./Posts";
import { useLoaderData } from "react-router-dom";
import PropTypes from "prop-types";

const Homepage = () => {
  const postsLoader = useLoaderData();
  return (
    <>
      <Posts posts={postsLoader}></Posts>
    </>
  );
};

Homepage.propTypes = {
  postsLoader: PropTypes.object,
};

export default Homepage;
