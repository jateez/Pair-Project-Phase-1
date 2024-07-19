const PersonaController = require("../controllers/persona");
const UserController = require("../controllers/user");

const router = require("express").Router();

router.get("/", UserController.communities)
router.get("/create", UserController.showCreateCommunity)
router.post("/create", UserController.createCommunity)
router.get("/join", UserController.showJoinCommunity)
router.post("/join", UserController.joinCommunity)
router.get("/:communityId/delete", UserController.deleteCommunity);
router.get("/:communityId/:personaId", UserController.communityPage);
router.get("/:communityId/:personaId/posts", UserController.posts);
router.post("/:communityId/:personaId/posts/create", UserController.createPost);
router.get("/:communityId/:personaId/posts/:postId/edit", UserController.showEditPost);
router.post("/:communityId/:personaId/posts/:postId/edit", UserController.editPost);
module.exports = router;
