import styles from "../components/Button.module.css";
import PropTypes from "prop-types";

const Button = ({ text, className, type }) => {
  return (
    <button className={styles[className]} type={type}>
      {text}
    </button>
  );
};

Button.propTypes = {
  text: PropTypes.string.isRequired,
  className: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
};

export default Button;
