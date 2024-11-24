import { useContext, useEffect, useState } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";

const NavBar = ({ user }) => {
  const navigate = useNavigate();

  const handleLogOut = () => {
    localStorage.clear();
    setUserObject(null);
    navigate("/log-in");
  };
  return (
    <>
      <header>
        <nav>
          <menu>
            <li>Home</li>
            <li>Posts</li>
            {!user ? (
              <>
                <li>Log In</li>
                <li>Sign Up</li>
              </>
            ) : (
              <>
                <li onClick={handleLogOut}>Log Out</li>
              </>
            )}
          </menu>
        </nav>
      </header>
    </>
  );
};

export default NavBar;
