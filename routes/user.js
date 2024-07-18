const UserController = require("../controllers/user");

const router = require("express").Router();

router.get("/profile", UserController.profile);

module.exports = router;