module.exports = {
  up: (queryInterface) => queryInterface.bulkInsert('Rooms', [
    {
      name: 'Yingo Studio',
      passageID: 8,
      image: 'src/assets/img/rooms/yingo.png',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      name: 'Vertigo Studio',
      passageID: null,
      image: 'src/assets/img/rooms/vertigo.png',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      name: 'Gran Hermano Studio',
      passageID: 6,
      image: 'src/assets/img/rooms/gh.png',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      name: 'Chtvnega Noticias Studio',
      passageID: null,
      image: 'src/assets/img/rooms/noticias.png',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      name: 'Primer Plano Studio',
      passageID: null,
      image: 'src/assets/img/rooms/primerplano.png',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      name: 'Tierra Brava Studio',
      passageID: 3,
      image: 'src/assets/img/rooms/tb.png',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      name: 'Teletón Studio',
      passageID: null,
      image: 'src/assets/img/rooms/teleton.png',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      name: 'SQP Studio',
      passageID: 1,
      image: 'src/assets/img/rooms/sqp.png',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      name: 'Calle 7 Studio',
      passageID: null,
      image: 'src/assets/img/rooms/calle7.png',
      createdAt: new Date(),
      updatedAt: new Date(),
    }
  ]),
  down: (queryInterface) => queryInterface.bulkDelete('Rooms', null, {}),
};
