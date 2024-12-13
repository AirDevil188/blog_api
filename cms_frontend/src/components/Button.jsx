import styles from "../components/Button.module.css";
import PropTypes from "prop-types";

const Button = ({ text, className, type, id, onClick }) => {
  return (
    <button className={styles[className]} type={type} onClick={onClick} id={id}>
      {text}
    </button>
  );
};

Button.propTypes = {
  text: PropTypes.string.isRequired,
  className: PropTypes.string,
  type: PropTypes.string.isRequired,
  onClick: PropTypes.func,
  id: PropTypes.string,
};

export default Button;
