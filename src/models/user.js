'use strict';
const {
  Model
} = require('sequelize');
const game = require('./game');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.hasMany(models.Player, {foreignKey: 'id'});
      //this.belongsTo(models.Game, {foreignKey: 'hostID'})
    }
  }
  User.init({
    username: {
      type: DataTypes.STRING,
      validate: {
        isAlphanumeric: {
          msg: "El nombre de usuario solo puede contener letras y números"
        }
      }
    },
    mail: {
      type: DataTypes.STRING,
      validate: {
        isEmail: {
          msg: "El mail debe ser válido"
        }
      }
    }, 
    password: {
      type: DataTypes.STRING,
      validate: {
        isValidPassword(value) {
          if (!value.match(/[a-z]/) || !value.match(/[0-9]/) || !value.match(/[@$!%*?&]/)){
            throw new Error("La contraseña debe contener al menos una letra, un número y un caracter especial");
          }
        }
      }
    }
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};