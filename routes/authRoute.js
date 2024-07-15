const express = require("express");
const { createUser, loginAdmin,logout,  } = require("../controller/userCtrl");

const router = express.Router();

router.post("/register",createUser);


router.post("/admin-login", loginAdmin); 


router.get("/logout", logout);

module.exports=router; 