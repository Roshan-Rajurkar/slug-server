const express = require("express");
const { register, login, resetpassword, forgotpassword, getProfile, logout } = require("../controllers/auth");
const { verifyToken } = require("../middlewares/verifyToken");
const router = express.Router();

router.post("/register", register);

router.post("/login" ,login);

router.post("/forgotpassword", forgotpassword);

router.put("/resetpassword/:resetPasswordToken", resetpassword);

router.get("/getprofile",verifyToken, getProfile);

router.get("/logout",verifyToken, logout);


module.exports = router;