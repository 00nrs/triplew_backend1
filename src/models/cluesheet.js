'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ClueSheet extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.Player, {foreignKey: 'id'});
      this.hasMany(models.Character, {foreignKey: 'id'});
      this.hasMany(models.Room, {foreignKey: 'id'});
      this.hasMany(models.Weapon, {foreignKey: 'id'});
    }
  }
  ClueSheet.init({
    characterID: DataTypes.INTEGER,
    roomID: DataTypes.INTEGER,
    weaponID: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'ClueSheet',
  });
  return ClueSheet;
};