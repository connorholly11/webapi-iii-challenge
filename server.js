const express = require("express");
const helmet = require("helmet");
const postRouter = require("./posts/postRouter");
const userRouter = require("./users/userRouter");

const server = express();

function logger(req, res, next) {
  const url = req.url;
  const method = req.method;
  console.log(`We are doing a ${method} on ${url}`);
  next();
}

server.use(express.json());
server.use(helmet());
server.use(logger);
server.use("/post", postRouter);
server.use("/user", userRouter);

server.get("/", (req, res) => {
  res.send(`<h2>Let's write some middleware!</h2>`);
});

//custom middleware

module.exports = server;
