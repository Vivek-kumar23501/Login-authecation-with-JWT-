const dotenv = require("dotenv");
dotenv.config();

const mongoose = require("mongoose");
mongoose.connect(process.env.DB);

const express = require("express");
const path = require("path");
const { createUser, loginUser,verifyToken ,} = require("./controller/user.controller");
const cors = require("cors");

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "view")));

app.use(cors({
  origin: "http://127.0.0.1:5500",
  credentials: true
}));

// Routes
app.post('/signup', createUser);
app.post('/login', loginUser);
app.get("/verify", verifyToken);


// Server start (ALWAYS LAST)
app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});