const UserController = require("../controllers/user");

const router = require("express").Router();

router.get("/profile", UserController.profile);
router.get("/profile/add", UserController.showInsertProfile);
router.post("/profile/add", UserController.insertProfile);

module.exports = router;