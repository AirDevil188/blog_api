import { jwtDecode } from "jwt-decode";
export const validateJWT = () => {
  if (localStorage.getItem("token")) {
    const decodedToken = jwtDecode(localStorage.getItem("token"));

    const currentDate = Date.now() / 1000;
    if (decodedToken.exp < currentDate) {
      localStorage.removeItem("token");
      return;
    }
    return decodedToken;
  }
};
