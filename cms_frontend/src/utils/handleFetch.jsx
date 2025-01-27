const host =
  import.meta.env.MODE === "development" ? "http://localhost:3000" : "http";

console.log(host);

export const handleFetch = async (endPoint, input = undefined, method) => {
  const token = localStorage.getItem("token");
  const options = {
    mode: "cors",
    method: method,
    body: JSON.stringify(input),
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
  };

  return fetch(host + endPoint, options);
};
