'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Persona extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Persona.belongsToMany(models.Community, { through: models.CommunityPersona });
      Persona.hasMany(models.Post);
    }
  }
  Persona.init({
    nickname: DataTypes.STRING,
    bio: DataTypes.STRING,
    profilePictureUrl: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Persona',
  });
  return Persona;
};