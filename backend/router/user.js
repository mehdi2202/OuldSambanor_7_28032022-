const express = require("express");
const router = express.Router();

const userCtrl = require("../controllers/user");
const postCtrl = require("../controllers/post");

const auth = require("../middleware/auth");
const multer = require("../middleware/multer-config");

router.get("/", userCtrl.findAllUsers);
router.get("/:id", userCtrl.findOneUser);
router.get("/:id/post", postCtrl.findPostsByUserId);
router.put("/:id", multer, userCtrl.modifyUser);
router.delete("/:id", userCtrl.deleteUser);

module.exports = router;
