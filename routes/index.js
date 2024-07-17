const Controller = require("../controllers/controllers");

const router = require("express").Router();

router.get("/", Controller.home);

module.exports = router;