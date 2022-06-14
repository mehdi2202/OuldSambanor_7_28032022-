const express = require("express");
const router = express.Router();
const postCtrl = require("../controllers/post");
const commentCtrl = require("../controllers/comment");
const likeCtrl = require("../controllers/like");
const auth = require("../middleware/auth");

router.post("/", postCtrl.createPost);
router.put("/:id", postCtrl.modifyPost);
router.delete("/:id", postCtrl.deletePost);
router.get("/", postCtrl.findAllPosts);
router.get("/:id", postCtrl.findOnePost);
router.get("/:id/comments", commentCtrl.findAllComments);
router.get("/:id/likes", likeCtrl.findAllLikes);

module.exports = router;
