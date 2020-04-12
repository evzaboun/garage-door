const auth = { isAuthenticated: false };

// Sign in fake auth simulation
auth.signIn = function () {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      this.isAuthenticated = true;
      resolve(this.isAuthenticated);
    }, 1000);
  });
};

auth.signOut = function () {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      this.isAuthenticated = false;
      resolve(this.isAuthenticated);
    }, 1000);
  });
};

auth.isLoggedIn = function () {
  return this.isAuthenticated;
};

//Promise calling
// auth.signIn().then((value) => {
//   console.log(value);
// });
export default auth;
