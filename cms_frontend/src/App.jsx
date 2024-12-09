import { useState } from "react";
import { Outlet } from "react-router-dom";

const App = () => {
  const [userObject, setUserObject] = useState("");
  const [errors, setErrors] = useState(null);

  return (
    <>
      <Outlet
        context={{
          userObject: [userObject, setUserObject],
          errors: [errors, setErrors],
        }}
      />
    </>
  );
};

export default App;
