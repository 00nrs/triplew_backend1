'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ActionCard extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  ActionCard.init({
    name: DataTypes.STRING,
    description: DataTypes.STRING,
    roomID: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'ActionCard',
  });
  return ActionCard;
};