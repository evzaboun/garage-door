const auth = {};

auth.getToken = () => {
  return localStorage.getItem("x-auth-token") || "";
};

auth.setToken = (token) => {
  localStorage.setItem("x-auth-token", token);
};

auth.logout = () => {
  localStorage.removeItem("x-auth-token");
};

export default auth;
