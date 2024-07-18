'use strict';
const {
  Model
} = require('sequelize');
const bcrypt = require('bcryptjs');

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.belongsTo(models.Profile)
      User.belongsToMany(models.Community, { through: models.UserCommunity });
    }

    static async getDataCommunitiesPersona(id) {
      try {
        let data = await User.findByPk(id, {
          include: [
            {
              model: sequelize.models.Community,
              include: {
                model: sequelize.models.Persona
              }
            },
            {
              model: sequelize.models.Profile
            }
          ]
        });
        return data;
      } catch (error) {
        throw error;
      }
    }
  }
  User.init({
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: {
        msg: "Username must be unique"
      },
      validate: {
        notNull: {
          msg: "Username cannot be null"
        },
        notEmpty: {
          msg: "Username cannot be empty"
        }
      }
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isEmail: {
          msg: "Must be a valid email address"
        },
        notNull: {
          msg: "Email cannot be null"
        },
        notEmpty: {
          msg: "Email cannot be empty"
        }
      },
      unique: {
        msg: "Email must be unique"
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: {
          args: [8],
          msg: "Password must have 8 characters at least"
        },
        notNull: {
          msg: "Password must not null",
          args: true
        },
        notEmpty: {
          msg: "Password must not null",
          args: true
        },
      }
    },
    role: DataTypes.INTEGER,
    ProfileId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'User',
  });
  User.beforeCreate((user) => {
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(user.password, salt);
    user.password = hash;
    if (!user.role) {
      user.role = 2;
    }
  })
  return User;
};