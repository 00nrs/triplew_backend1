'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Game extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.hasMany(models.Player, {foreignKey: 'gameID'});
      this.hasOne(models.Event, {foreignKey: 'gameID'});
      this.hasMany(models.Box, {foreignKey: 'id'});
    }
  }
  Game.init({
    winner: DataTypes.STRING,
    hostID: DataTypes.INTEGER,
    players: DataTypes.ARRAY(DataTypes.INTEGER),
    correctKeys: {
      type: DataTypes.JSON,
      validate: {
        isValidStructure(value) {
          const expectedKeys = ['character', 'weapon', 'room'];
          const actualKeys = Object.keys(value);
          const missingKeys = expectedKeys.filter(key => !actualKeys.includes(key));
  
          if (missingKeys.length > 0) {
            throw new Error(`The following keys are missing: ${missingKeys.join(', ')}`);
          }
        }
      }
    },
    currentTurn: DataTypes.INTEGER,
    remainingRumorCards: DataTypes.ARRAY(DataTypes.INTEGER),
    code: DataTypes.STRING,
    started: DataTypes.BOOLEAN,
    eventID: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'Game',
  });
  return Game;
};