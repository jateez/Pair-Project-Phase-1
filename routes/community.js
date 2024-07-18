const UserController = require("../controllers/user");

const router = require("express").Router();

router.get("/", UserController.communities)
router.get("/:communityId/:personaId", UserController.showLogin);
router.get("/:communityId/:personaId/profile", UserController.showLogin);
module.exports = router;
