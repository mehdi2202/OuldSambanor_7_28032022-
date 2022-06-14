const express = require("express");
const router = express.Router();

const userCtrl = require("../controllers/auth");
const checkPassword = require("../middleware/check-password");
const checkEmail = require("../middleware/check-email");

router.post("/signup", checkEmail, checkPassword, userCtrl.signup);
router.post("/login", userCtrl.login);

module.exports = router;
