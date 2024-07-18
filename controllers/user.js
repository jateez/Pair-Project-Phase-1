const bcrypt = require("bcryptjs/dist/bcrypt.js");
const { User, Persona, Community, Profile } = require("../models/index.js");
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

      let user = await User.findOne({ where: { email: email } });
      if (!user) {
        const errors = "Invalid, email not found. Please register a new account instead.";
        return res.redirect(`/login?error=${errors}`);
      }

      const isValidPassword = bcrypt.compareSync(password, user.password);
      if (!isValidPassword) {
        const errors = "Invalid, email or password is not correct. Please login with the correct email/password.";
        return res.redirect(`/login?error=${errors}`);
      }

      req.session.userId = user.id;
      return res.redirect(`/${req.session.userId}/profile/add`);
    } catch (error) {
      res.send(error);
    }
  }

  // Middleware Auth
  static async authSession(req, res, next) {
    if (!req.session.userId) {
      const error = "Please login to your account first";
      return res.redirect(`/login?error=${error}`);
    } else {
      const sessionUserId = req.session.userId;
      const paramUserId = req.params.userId;
      if (paramUserId != sessionUserId) {
        return res.redirect(`/${sessionUserId}${req.path.replace(`/${paramUserId}`, '')}`);
      }
      next();
    }
  }

  static async profile(req, res) {
    try {
      let { userId } = req.session;
      let data = await User.findByPk(userId, {
        include: [
          {
            model: Community
          }, {
            model: Profile
          },
        ]
      });
      res.render("profile", { data });
    } catch (error) {
      res.send(error);
    }
  }

  static async showInsertProfile(req, res) {
    try {
      let { userId } = req.session;
      let data = await User.findByPk(userId)
      if (data.ProfileId) {
        return res.redirect(`/${userId}/communities`)
      }
      res.render("insert-profile", { data });
    } catch (error) {
      res.send(error);
    }
  }

  static async insertProfile(req, res) {
    try {
      let { userId } = req.session;
      let { firstName, lastName, gender, dateOfBirth } = req.body;
      let userProfile = await findByPk(userId);
      if (!userProfile) {
        let data = await Profile.create({ firstName, lastName, gender, dateOfBirth });
        await User.update({
          ProfileId: data.id
        }, {
          where: {
            id: userId
          }
        })
      }
      res.redirect(`/${userId}/communities`);
    } catch (error) {
      console.log(error);
      res.send(error);
    }
  }

  static async communities(req, res) {
    try {
      const { userId } = req.session;
      const data = await User.findByPk(userId, {
        include: Community
      });
      res.render("communities", { data });
    } catch (error) {
      res.send(error);
    }
  }
}

module.exports = UserController;