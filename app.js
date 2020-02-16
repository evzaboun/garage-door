const express = require("express");
const controller = require("./controller");
const ws = require("./ws");
const app = express();

//Express app
app.use(express.static("./public"));

const port = process.env.PORT || 8080;

app.set("port", port);

app.listen(port, "192.168.1.250", () => {
  console.log(`Server is listening on port: ${port}`);
});

app.get("/", (req, res) => {
  console.log("Rooot is resolved");
  res.send("Hello from route!");
});
