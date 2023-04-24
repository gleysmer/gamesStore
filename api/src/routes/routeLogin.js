const { Router } = require("express");
const router = Router();

const { userSignin, resetPassword}= require('../Controllers/Login');

router.post('/login', userSignin);
router.put('/passwordUpdate', resetPassword);

module.exports= router;