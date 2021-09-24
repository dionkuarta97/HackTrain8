const express = require("express");
const home_controller = require("../controllers/home_controller");
const router = express.Router();

const auth_route = require("./auth_route");

const admin_route = require("./admin_route");

const register_route = require("./register_route");

const [admin, user] = require("../helper/Auth");

router.get("/", home_controller.showLandingPage);
router.use("/auth", auth_route);
router.use("/Admin", admin, admin_route);

router.use("/register", register_route);

module.exports = router;
