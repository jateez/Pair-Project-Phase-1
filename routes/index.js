const Controller = require("../controllers/controllers");
const UserController = require("../controllers/user");
const userRouter = require("./user");
const router = require("express").Router();

router.get("/", Controller.home);
router.get("/register", UserController.showRegister);
router.post("/register", UserController.register);
router.get("/login", UserController.showLogin);
router.post("/login", UserController.login);
router.get("/logout", UserController.logout);

router.use("/:userId", UserController.authSession, userRouter);
module.exports = router;