require("dotenv").config();
// ...

const express = require("express");

const app = express();

app.use(express.json()); // add this line

// ...

const port = process.env.APP_PORT ?? 5000;

const welcome = (req, res) => {
  res.send("Welcome to my favourite userlist");
};

app.get("/", welcome);

const userHandlers = require("./userHandlers");

const { validateUser } = require("./validator.js");

app.get("/api/users", userHandlers.getUsers);
app.get("/api/users/:id", userHandlers.getUsersById);
app.post("/api/users", validateUser, userHandlers.postuser);
app.put("/api/users/:id", userHandlers.updateUser);
app.delete("/api/users/:id", userHandlers.deleteUser);
app.listen(port, (err) => {
  if (err) {
    console.error("Something bad happened");
  } else {
    console.log(`Server is listening on ${port}`);
  }
});
