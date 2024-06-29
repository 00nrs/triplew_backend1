'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Players', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        unique: true,
        type: Sequelize.INTEGER
      },
      userID: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Users',
          key: 'id'
        }
      },
      name: {
        type: Sequelize.STRING
      },
      gameID: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Games',
          key: 'id'
        }
      },
      characterID: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Characters',
          key: 'id'
        }
      },
      clueSheetID: {
        type: Sequelize.INTEGER,
        references: {
          model: 'ClueSheets',
          key: 'id'
        }
      },
      cards: {
        type: Sequelize.ARRAY(Sequelize.INTEGER)
      },
      box: {
        type: Sequelize.STRING
      },
      lastRoom: {
        type: Sequelize.INTEGER
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
    await queryInterface.dropTable('Players');
  }
};