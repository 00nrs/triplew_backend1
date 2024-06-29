module.exports = {
  up: (queryInterface) => queryInterface.bulkInsert('Events', [
    {
      gameID: 1,
      createdAt: new Date(),
      updatedAt: new Date(),
    },    {
      gameID: 2,
      createdAt: new Date(),
      updatedAt: new Date(),
    },

  ]),
  down: (queryInterface) => queryInterface.bulkDelete('Events', null, { truncate: true, cascade: true }),
};