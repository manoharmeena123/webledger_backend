const express = require("express");
 const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args))


const app = express();
app.use(express.json());
require("dotenv").config();
const cookieParser = require("cookie-parser");
app.use(cookieParser());

const {authenticate} = require("./middleware/authenticate")
const { connection } = require("./config/config");
const {userRouter} = require("./routers/user.router")
const {searchRouter} = require("./routers/recipe.router")
const cors = require("cors");
app.use(
  cors({
    origin: "*",
  })
);



app.get("/", (req, res) => {
  console.log(req.cookies);
  res.json("Welcome");
});

app.use("/user", userRouter);

// app.use(authenticate)
app.use("/search", searchRouter);


//Port===================================================>
app.listen(process.env.port, async () => {
  try {
    await connection;
    console.log("Connected to DB");
  } catch (error) {
    console.log(error);
  }
  console.log("Server on 8000");
});