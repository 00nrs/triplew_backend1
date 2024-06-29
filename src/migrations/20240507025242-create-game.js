'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Games', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      winner: {
        type: Sequelize.STRING
      },
      hostID: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Users',
          key: 'id'
        }
      },
      players: {
        type: Sequelize.ARRAY(Sequelize.INTEGER)
      },
      correctKeys: {
        type: Sequelize.JSON
      },
      currentTurn: {
        type: Sequelize.INTEGER
      },
      remainingRumorCards: {
        type: Sequelize.ARRAY(Sequelize.INTEGER)
      },
      code: {
        type: Sequelize.STRING
      },
      started: {
        type: Sequelize.BOOLEAN
      },
      eventID: {
        type: Sequelize.INTEGER,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Games');
  }
};