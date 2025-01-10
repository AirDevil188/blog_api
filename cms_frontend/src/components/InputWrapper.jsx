import PropTypes, { bool, string } from "prop-types";
import styles from "../components/Form.module.css";

const InputWrapper = ({
  className,
  label,
  type,
  name,
  isRequired,
  id,
  value,
  check,
}) => {
  return (
    <div className={styles[className]}>
      <label htmlFor={name}>{label}</label>
      <input
        type={type}
        required={isRequired}
        id={id}
        name={name}
        defaultValue={value}
        defaultChecked={check}
      />
    </div>
  );
};

InputWrapper.propTypes = {
  className: PropTypes.string,
  label: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  isRequired: PropTypes.bool,
  id: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([string, bool]),
  check: PropTypes.bool,
};

export default InputWrapper;
