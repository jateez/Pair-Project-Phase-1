const UserController = require("../controllers/user");
const communityRoutes = require("./community.js");
const router = require("express").Router();

router.get("/profile", UserController.profile);
router.get("/profile/add", UserController.showInsertProfile);
router.post("/profile/add", UserController.insertProfile);
router.get("/profile/changeRole", UserController.changeRole)
router.use("/communities", communityRoutes)
module.exports = router;