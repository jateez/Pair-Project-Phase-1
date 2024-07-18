const bcrypt = require("bcryptjs/dist/bcrypt.js");
const { User, Persona, Community } = require("../models/index.js");
class UserController {
  // GET Register
  static async showRegister(req, res) {
    try {
      res.render("register")
    } catch (error) {
      res.send(error)
    }
  }
  // POST Register
  static async register(req, res) {
    try {
      const { username, email, password } = req.body;
      await User.create({ username, email, password })
      res.redirect("/login");
    } catch (error) {
      res.send(error)
    }
  }
  // GET Login
  static async showLogin(req, res) {
    try {
      res.render("login")
    } catch (error) {
      res.send(error)
    }
  }
  // POST Login
  static async login(req, res) {
    try {
      const { email, password } = req.body;
      console.log(email, password, "<<< email password");

      let user = await User.findOne({ where: { email: email } });
      console.log(user);
      if (!user) {
        const error = "Invalid, email not found. Please register a new account instead.";
        return res.redirect(`/login?error=${error}`);
      }

      console.log(user.password);
      const isValidPassword = bcrypt.compareSync(password, user.password);
      console.log(isValidPassword, "isValid");
      if (!isValidPassword) {
        const error = "Invalid, email or password is not correct. Please login with the correct email/password.";
        return res.redirect(`/login?error=${error}`);
      }

      req.session.userId = user.id;
      console.log(user.id, "<<< user.id", req.session.userId, "<< req.session.userId");
      res.redirect(`/${req.session.userId}/profile`);
    } catch (error) {
      res.send(error);
    }
  }

  // Middleware Auth
  static async authSession(req, res, next) {
    console.log("Checking authentication");
    if (!req.session.userId) {
      const error = "Please login to your account first";
      return res.redirect(`/login?error=${error}`);
    } else {
      const sessionUserId = req.session.userId;
      const paramUserId = req.params.userId;
      console.log(sessionUserId, "<<< sessionUserId");
      console.log(paramUserId, "<<< paramUserId");
      console.log(paramUserId == sessionUserId)
      if (paramUserId != sessionUserId) {
        console.log("Redirecting to correct user");
        return res.redirect(`/${sessionUserId}${req.path.replace(`/${paramUserId}`, '')}`);
      }
      next();
    }
  }

  static async profile(req, res) {
    try {
      res.send(`${req.session.userId}`)
    } catch (error) {
      res.send(error);
    }
  }
}

module.exports = UserController;