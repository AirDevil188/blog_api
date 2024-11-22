import { useContext, useEffect } from "react";
import { validateJWT } from "../helper/validateJWT";
import { UserContext } from "../App";

const Homepage = () => {
  const { userObject, setUserObject } = useContext(UserContext);

  const fetchPOSTS = async () => {
    const response = await fetch("http://localhost:3000/posts", {
      mode: "cors",
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });
    const data = await response.json();
    return data;
  };

  useEffect(() => {
    fetchPOSTS();
  });
};

export default Homepage;
