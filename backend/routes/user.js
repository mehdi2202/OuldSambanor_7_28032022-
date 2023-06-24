const express = require('express');
const router = express.Router();

const userCtrl = require ('../controllers/user');
const checkPassword = require('../middleware/check-password');
const checkEmail = require('../middleware/check-email');
const auth = require('../middleware/auth');

router.post('/signup', checkEmail, checkPassword, userCtrl.signup);
router.post('/login', userCtrl.login);
router.get('/:id', userCtrl.getOneUser);
router.delete('/:id', auth, userCtrl.deleteUser);

module.exports = router;