import styles from "./Navbar.module.css";
import { RxHamburgerMenu } from "react-icons/rx";
import useClickOutside from "../hooks/useClickOutside";
import { Link } from "react-router-dom";

const NavBar = ({ user, setUserObject, hamburger, setHamburger }) => {
  const handleLogOut = () => {
    localStorage.clear();
    setUserObject("");
    navigate("/log-in");
  };

  const handleOutsideClick = () => {
    setHamburger(false);
  };

  const ref = useClickOutside(handleOutsideClick);

  return (
    <>
      <header ref={ref}>
        <button
          className={styles.hamburgerBtn}
          onClick={() => setHamburger(!hamburger)}
        >
          <RxHamburgerMenu size={30} />
        </button>
        <section className={styles.logoSection}>
          <h1>A Blog</h1>
        </section>
        <nav className={styles.nav}>
          <menu className={hamburger ? styles.menuOpen : styles.menuClose}>
            <Link to={"/"} onClick={() => setHamburger(false)}>
              <li>Home</li>
            </Link>
            {!user ? (
              <>
                <Link to={"/log-in"} onClick={() => setHamburger(false)}>
                  <li>Log In</li>
                </Link>
                <Link to={"/sign-up"} onClick={() => setHamburger(false)}>
                  <li>Sign Up</li>
                </Link>
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
