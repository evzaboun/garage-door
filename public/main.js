if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker
      .register("/sw.js")
      .then(reg => {
        console.log("Registered the SW with scope: ", reg.scope);
      })
      .catch(err => {
        console.log("Registration of the SW failed!", err);
      });
  });
} else {
  console.log("Service workers are not supported.");
}
