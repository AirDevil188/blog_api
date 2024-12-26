import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { validateJWT } from "./helper/validateJWT";
import NavBar from "./components/Navbar";
import Footer from "./components/Footer";
import "./index.css";

const App = () => {
  const [userObject, setUserObject] = useState({ token: null, username: null });
  const [errors, setErrors] = useState(null);
  const [hamburger, setHamburger] = useState(false);

  useEffect(() => {
    const token = validateJWT();
    if (token) {
      setUserObject({
        ...userObject,
        username: token.username,
        token: localStorage.getItem("token"),
      });
    }
  }, [userObject.token]);
  return (
    <>
      <NavBar
        user={userObject}
        setUserObject={setUserObject}
        hamburger={hamburger}
        setHamburger={setHamburger}
      />
      <Outlet
        context={{
          userObject: [userObject, setUserObject],
          errors: [errors, setErrors],
        }}
      />
      <Footer />
    </>
  );
};

export default App;
