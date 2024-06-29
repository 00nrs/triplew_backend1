'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Player extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.User, {foreignKey: 'userID'});
      this.belongsTo(models.Game, {foreignKey: 'gameID'});
      this.hasOne(models.Character, {foreignKey: 'id'});
      this.hasOne(models.ClueSheet, {foreignKey: 'id'});
      this.hasMany(models.Card, {foreignKey: 'id'});
    }
  }
  Player.init({
    userID: DataTypes.INTEGER,
    name: {
      type: DataTypes.STRING,
      validate: {
        isAlphanumeric: {
          msg: "El nombre solo puede contener letras y números"
        }
      }
    },
    gameID: DataTypes.INTEGER,
    characterID: DataTypes.INTEGER,
    clueSheetID: DataTypes.INTEGER,
    cards: DataTypes.ARRAY(DataTypes.INTEGER),
    box: DataTypes.STRING,
    lastRoom: DataTypes.INTEGER,
    turnNumber: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Player',
  });
  return Player;
};