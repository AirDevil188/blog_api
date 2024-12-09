import PropTypes from "prop-types";
import styles from "../components/Form.module.css";

const InputWrapper = ({ className, label, type, name, isRequired, id }) => {
  return (
    <div className={styles[className]}>
      <label htmlFor={name}>{label}</label>
      <input type={type} required={isRequired} id={id} name={name} />
    </div>
  );
};

InputWrapper.propTypes = {
  className: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  isRequired: PropTypes.bool.isRequired,
  id: PropTypes.string.isRequired,
};

export default InputWrapper;
