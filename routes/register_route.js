const express = require("express");
const router = express.Router();
const register_controller = require("../controllers/register_controller");

router.get("/", register_controller.userRegister);

router.post("/", register_controller.userRegisterPost);

module.exports = router;
