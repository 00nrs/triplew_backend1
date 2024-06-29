'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Character extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      //this.belongsTo(models.Player, {foreignKey: 'characterID'});
    }
  }
  Character.init({
    ability: DataTypes.STRING,
    color: DataTypes.STRING,
    name: DataTypes.STRING,
    image: DataTypes.STRING,
    token: DataTypes.STRING,
    initialBox: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'Character',
  });
  return Character;
};