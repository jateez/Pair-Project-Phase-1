const UserController = require("../controllers/user");

const router = require("express").Router();

router.get("/", UserController.communities)
router.get("/create", UserController.showCreateCommunity)
router.post("/create", UserController.createCommunity)
router.get("/join", UserController.showJoinCommunity)
router.post("/join", UserController.joinCommunity)
router.get("/:communityId/delete", UserController.deleteCommunity);
router.get("/:communityId/:personaId", UserController.showLogin);
router.get("/:communityId/:personaId/profile", UserController.showLogin);
module.exports = router;
