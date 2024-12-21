import PropTypes from "prop-types";

const Form = ({ method, onSubmit, children }) => {
  return (
    <>
      <form method={method} onSubmit={onSubmit}>
        {children}
      </form>
    </>
  );
};

Form.propTypes = {
  method: PropTypes.string,
  onSubmit: PropTypes.func,
  children: PropTypes.node,
};

export default Form;
