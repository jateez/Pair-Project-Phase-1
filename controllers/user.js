const bcrypt = require("bcryptjs/dist/bcrypt.js");
const { User, Persona, Community, Profile, CommunityPersona, UserCommunity, Post } = require("../models/index.js");
const { Op, where } = require("sequelize");
const { formatDate } = require("../helpers/helper.js");
class UserController {
  // GET Register
  static async showRegister(req, res) {
    try {
      let { errors } = req.query;
      res.render("register", { errors })
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
      if (error.name === "SequelizeValidationError") {
        let errors = error.errors.map(el => el.message)
        res.redirect(`/register?errors=${errors}`);
      } else {
        res.send(error);
      }
    }
  }
  // GET Login
  static async showLogin(req, res) {
    try {
      let { errors } = req.query;
      res.render("login", { errors })
    } catch (error) {
      if (error.name === "SequelizeValidationError") {
        let errors = error.errors.map(el => el.message)
        res.redirect(`/login?errors=${errors}`);
      } else {
        res.send(error);
      }
    }
  }
  // POST Login
  static async login(req, res) {
    try {
      const { email, password } = req.body;

      let user = await User.findOne({ where: { email: email } });
      if (!user) {
        const errors = "Invalid, email not found. Please register a new account instead.";
        return res.redirect(`/login?errors=${errors}`);
      }

      const isValidPassword = bcrypt.compareSync(password, user.password);
      if (!isValidPassword) {
        const errors = "Invalid, email or password is not correct. Please login with the correct email/password.";
        return res.redirect(`/login?errors=${errors}`);
      }

      req.session.userId = user.id;
      req.session.role = user.role;
      return res.redirect(`/${req.session.userId}/profile/add`);
    } catch (error) {
      if (error.name === "SequelizeValidationError") {
        let errors = error.errors.map(el => el.message)
        res.redirect(`/login?errors=${errors}`);
      } else {
        res.send(error);
      }
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
      // req.session.userId = 3;
      next();
    }
  }

  static async logout(req, res) {
    try {
      req.session.destroy();
      res.redirect("/");
    } catch (error) {
      res.send(error);
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
      res.render("profile", { data, formatDate, userId });
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
      let userProfile = await Profile.findByPk(userId);
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
      // const data = await User.findByPk(userId, {
      //   include: [
      //     {
      //       model: Community,
      //       include: {
      //         model: Persona
      //       }
      //     },
      //     {
      //       model: Profile
      //     }
      //   ]
      // });

      const data = await User.getDataCommunitiesPersona(userId);
      res.render("communities", { data, userId });
    } catch (error) {
      console.log(error)
      res.send(error);
    }
  }

  static async showCreateCommunity(req, res) {
    try {
      let { userId } = req.session;
      console.log(req.session);
      res.render("create-community", { userId });
    } catch (error) {
      console.log(error);
      res.send(error);
    }
  }
  static async createCommunity(req, res) {
    try {
      let { userId } = req.session;
      let { name, description, nickname, bio, profilePicture } = req.body;
      let newCommunity = await Community.create({ name, description });
      let newPersona = await Persona.create({ nickname, bio, profilePicture });
      await CommunityPersona.create({ CommunityId: newCommunity.id, PersonaId: newPersona.id, role: 1 });
      await UserCommunity.create({ UserId: userId, CommunityId: newCommunity.id, isOwner: true })
      res.redirect(`/${userId}/communities`);
    } catch (error) {
      console.log(error);
      res.send(error);
    }
  }
  static async showJoinCommunity(req, res) {
    try {
      let { search } = req.query;
      let options = {}

      if (search) {
        options.where = {
          name: {
            [Op.iLike]: `%${search}%`
          }
        }
      }
      let { userId } = req.session;
      let user = await Profile.findByPk(userId);
      let data = await Community.findAll(options);
      res.render("join-community", { data, userId, user });
    } catch (error) {
      console.log(error);
      res.send(error);
    }
  }
  static async joinCommunity(req, res) {
    try {
      let { userId } = req.session;
      let { communityId } = req.body;

      await UserCommunity.create({ UserId: userId, CommunityId: communityId, isOwner: false });
      res.redirect(`/${userId}/communities`);
    } catch (error) {
      console.log(error);
      res.send(error);
    }
  }
  static async deleteCommunity(req, res) {
    try {
      let { userId } = req.session;
      let user = await User.findByPk(userId);
      if (user.role === 1) {
        let { communityId } = req.params;
        let communityPersonas = await CommunityPersona.findAll({
          where: {
            CommunityId: communityId
          },
          attributes: ['PersonaId']
        });

        let personaIds = communityPersonas.map(el => el.PersonaId);

        await UserCommunity.destroy({
          where: {
            CommunityId: communityId
          }
        });

        await Community.destroy({
          where: {
            id: communityId
          }
        });

        await CommunityPersona.destroy({
          where: {
            CommunityId: communityId
          }
        });

        await Persona.destroy({
          where: {
            id: personaIds
          }
        });
      }
      res.redirect(`/${userId}/communities`);
    } catch (error) {
      console.log(error);
      res.send(error);
    }
  }
  static async communityPage(req, res) {
    try {
      let { userId } = req.session;
      let { communityId, personaId } = req.params;
      const community = await Community.findByPk(communityId, {
        include: {
          model: Persona,
          include: Post
        }
      });
      const user = await User.findByPk(userId);
      const persona = await Persona.findByPk(personaId);
      const posts = [];
      community.Personas.forEach(persona => {
        persona.Posts.forEach(post => {
          posts.push({
            ...post.dataValues,
            posterName: persona.name,
            posterProfilePhoto: persona.profilePhoto
          });
        });
      });
      console.log(posts);
      res.render("communities-page", { data: posts, userId, communityId, personaId, persona, user })
    } catch (error) {
      res.send(error);
    }
  }

  static async posts(req, res) {
    try {
      let { userId } = req.session;
      let { communityId, personaId } = req.params
      const community = await Community.findByPk(communityId, {
        include: {
          model: Persona,
          where: { id: personaId },
          include: {
            model: Post,
          }
        }
      });
      const persona = community.Personas[0];
      const posts = persona.Posts;
      console.log(posts)
      res.render("persona-posts", { posts, userId, communityId, personaId })
    } catch (error) {
      res.send(error)
    }
  }

  static async createPost(req, res) {
    try {
      let { description, imageUrl } = req.body
      let { userId } = req.session;
      let { communityId, personaId } = req.params;

      await Post.create({ PersonaId: personaId, description, imageUrl });
      res.redirect(`/${userId}/communities/${communityId}/${personaId}`);
    } catch (error) {
      console.log(error)
      res.send(error);
    }
  }
  static async showEditPost(req, res) {
    try {
      let { userId } = req.session;
      let { communityId, personaId, postId } = req.params;

      let data = await Post.findByPk(postId, {
        where: {
          PersonaId: personaId
        },
        order: [
          ["id", "ASC"]
        ]
      });
      console.log(data)
      res.render(`edit-post`, { data, userId, communityId, personaId });
    } catch (error) {
      console.log(error)
      res.send(error);
    }
  }
  static async editPost(req, res) {
    try {
      let { description, imageUrl } = req.body
      let { userId } = req.session;
      let { communityId, personaId, postId } = req.params;

      await Post.update({ description, imageUrl }, {
        where: {
          id: postId
        }
      });
      res.redirect(`/${userId}/communities/${communityId}/${personaId}/posts`);
    } catch (error) {
      res.send(error);
    }
  }

  static async changeRole(req, res) {
    try {
      let { userId } = req.session;
      await User.update({ role: 1 }, {
        where: {
          id: userId
        }
      })
      res.redirect(`/${userId}/profile`)
    } catch (error) {
      res.send(error);
    }
  }


}

module.exports = UserController;