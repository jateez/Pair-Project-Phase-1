'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Community extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Community.belongsToMany(models.User, { through: models.UserCommunity });
      Community.belongsToMany(models.Persona, { through: models.CommunityPersona })
    }
  }
  Community.init({
    name: DataTypes.STRING,
    description: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Community',
  });
  return Community;
};