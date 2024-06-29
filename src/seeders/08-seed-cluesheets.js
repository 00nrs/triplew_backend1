module.exports = {
  up: (queryInterface) => queryInterface.bulkInsert('ClueSheets', [
    {
      characterID: 1,
      roomID: 1,
      weaponID: 2,
      createdAt: new Date(),
      updatedAt: new Date(),
  },
  {
      characterID: 2,
      roomID: 2,
      weaponID: 1,
      createdAt: new Date(),
      updatedAt: new Date(),
  },
  {
    characterID: 3,
    roomID: 3,
    weaponID: 7,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    characterID: 4,
    roomID: 4,
    weaponID: 6,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    characterID: 5,
    roomID: 9,
    weaponID: 1,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    characterID: 6,
    roomID: 6,
    weaponID: 8,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  ]),
  down: (queryInterface) => queryInterface.bulkDelete('ClueSheets', null, { truncate: true, cascade: true }),
};
