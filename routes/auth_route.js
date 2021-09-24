const express = require("express");
const router = express.Router();

const auth_controller = require("../controllers/auth_controller");

router.get("/", auth_controller.userLogin);

router.post("/cek_login", auth_controller.cek_login);

router.get("/lupa_password", auth_controller.lupa_password);

router.post("/lupa_password", auth_controller.ganti_password);

router.get("/logout", auth_controller.logout);

module.exports = router;
