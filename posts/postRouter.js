const express = require("express");
const db = require("./postDb");

const router = express.Router();

router.get("/", (req, res) => {
  db.get().then(posts => {
    res.status(200).json(posts);
  });
});

router.get("/:id", (req, res) => {
  const id = req.params.id;
  db.getById(id).then(post => {
    res.status(200).json(post);
  });
});

router.delete("/:id", (req, res) => {
  const id = req.params.id;

  db.remove(id).then(deleted => {
    res.status(204).json(deleted);
  });
});

router.put("/:id", validatePostId, (req, res) => {
  const id = req.params.id;
  const changes = req.body;

  db.update(id, changes).then(updated => {
    res.status(200).json(updated);
  });
});

// custom middleware

function validatePostId(req, res, next) {
  const id = req.params.id;

  db.getById(id).then(id => {
    if (id) {
      next();
    } else {
      res.status(404).json({
        message: "404 error, invalid ID"
      });
    }
  });
}

module.exports = router;
