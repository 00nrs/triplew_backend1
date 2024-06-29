module.exports = {
  up: (queryInterface) => queryInterface.bulkInsert('Games', [
    {
      winner: null,
      hostID: 7,
      players: [7, 8, 9],
      currentTurn: 1,
      correctKeys: JSON.stringify({
        character: 1,
        weapon: 1,
        room: 1,
      }),
      code: "27jp3",
      eventID: 1,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      winner: null,
      hostID: 3,
      players: [1, 2, 3, 4, 5, 6],
      correctKeys: JSON.stringify({
        character: 1,
        weapon: 1,
        room: 1,
      }),
      eventID: 2,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      winner: null,
      hostID: 1,
      players: [1, 2, 3, 6, 7, 8],
      correctKeys: JSON.stringify({
        character: 4,
        weapon: 7,
        room: 3,
      }),
      createdAt: new Date(),
      updatedAt: new Date(),
    }
  ]),
  down: (queryInterface) => queryInterface.bulkDelete('Games', null, { truncate: true, cascade: true }),
};