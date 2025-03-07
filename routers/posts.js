const express = require("express");
const router = express.Router();

//controller 
const {index, show, create, update, destroy} = require("../controllers/postController.js")

//import 
const posts = require("../data/posts.js");
// routing

// Index
router.get("/", index);

// Show
router.get("/:id", show);

// Create
router.post("/", create);

// Update 
router.put("/:id", update);

// Delete
router.delete("/:id", destroy);

//export 
module.exports = router