const express = require("express");
const db = require("./userDb");

const router = express.Router();

router.post("/", validateUser, (req, res) => {
  const newUser = req.body;

  db.insert(newUser)
    .then(user => {
      res.status(201).json(user);
    })
    .catch(error => {
      res.status(500).json({
        error: error,
        message: "THERE WAS AN ERROR CREATING A NEW USER"
      });
    });
});

router.post("/:id/posts", validateUserId, (req, res) => {});

router.get("/", (req, res) => {
  db.get()
    .then(user => {
      res.status(200).json(user);
    })
    .catch(error => {
      res.status(500).json({
        error: error,
        message: "THERE WAS AN ERROR GETTING USERS"
      });
    });
});

router.get("/:id", validateUserId, (req, res) => {
  res.send("validation ID is working");
});

router.get("/:id/posts", validateUserId, (req, res) => {});

router.delete("/:id", validateUserId, (req, res) => {});

router.put("/:id", validateUserId, (req, res) => {});

//custom middleware

function validateUserId(req, res, next) {
  id = req.params.id;

  if (id) {
    req.user = id;
    next();
  } else {
    res.status(400).json({ message: "invalid user id" });
  }
}

function validateUser(req, res, next) {
  const user = req.body;

  if (user) {
    next();
  } else {
    res.status(400).json({ message: "missing required name field" });
  }
}

function validatePost(req, res, next) {
  next();
}

module.exports = router;
