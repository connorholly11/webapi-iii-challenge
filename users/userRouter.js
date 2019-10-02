const express = require("express");
const db = require("./userDb");
const postDB = require("../posts/postDb");

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

router.post("/:id/posts", validateUserId, validatePost, (req, res) => {
  const newPost = req.body;

  postDB
    .insert(newPost)
    .then(post => {
      if (post) {
        res.status(201).json(post);
      } else {
        res.status(404).json({ message: "404 id invalid" });
      }
    })
    .catch(error => {
      res.status(500).json({
        error: error,
        message: "THERE WAS AN ERROR CREATING A USER POST"
      });
    });
});

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
  const id = req.params.id;

  db.getById(id)
    .then(user => {
      res.status(200).json(user);
    })
    .catch(error => {
      res.status(500).json({
        error: error,
        message: "THERE WAS AN ERROR GETTING USER ID"
      });
    });
});

router.get("/:id/posts", validateUserId, (req, res) => {
  const id = req.params.id;

  db.getUserPosts(id)
    .then(post => {
      res.status(200).json(post);
    })
    .catch(error => {
      res.status(500).json({
        error: error,
        message: "THERE WAS AN ERROR GETTING USER id's post"
      });
    });
});

router.delete("/:id", validateUserId, (req, res) => {
  const id = req.params.id;

  db.remove(id)
    .then(deleted => {
      res.status(204).json(deleted);
      console.log("deleted user id");
    })
    .catch(error => {
      res.status(500).json({
        error: error,
        message: "THERE WAS AN ERROR DELETING USER ID"
      });
    });
});

router.put("/:id", validateUserId, (req, res) => {
  const editName = req.params.id;
  const changes = req.body;

  db.update(editName, changes)
    .then(updatedName => {
      res.status(200).json(updatedName);
    })
    .catch(error => {
      res.status(500).json({
        error: error,
        message: "THERE WAS AN ERROR EDITING USER ID"
      });
    });
});

//custom middleware

function validateUserId(req, res, next) {
  id = req.params.id;

  console.log("validation user id is running");

  if (id) {
    req.user = id;
    next();
  } else {
    res.status(400).json({ message: "invalid user id" });
  }
}

function validateUser(req, res, next) {
  user = req.body;

  console.log("validation User is running");

  if (user) {
    next();
  } else {
    res.status(400).json({ message: "missing required name field" });
  }
}

function validatePost(req, res, next) {
  post = req.body;

  console.log("validate post is running");
  if (post) {
    next();
  } else {
    res.status(400).json({ message: "missing post data" });
  }
  if (post.text === "") {
    res.status(400).json({ message: "missing required text field" });
  }
}

module.exports = router;
