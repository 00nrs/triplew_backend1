module.exports = {
  up: (queryInterface) => queryInterface.bulkInsert('Characters', [
    {
      ability: 'Una vez por juego, puedes ver la carta que un jugador le acaba de mostrar a otro.',
      color: 'red',
      name: 'Srita Eskarcita',
      image: 'src/assets/img/characters/skarcita-profile.png',
      token: 'src/assets/img/board/red-token.png',
      initialBox: 'Q1',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      ability: 'Una vez por juego, puedes moverte a cualquier studio sin pasaje secreto.',
      color: 'white',
      name: 'Pamela Díaz',
      image: 'src/assets/img/characters/pamela-profile.png',
      token: 'src/assets/img/board/white-token.png',
      initialBox: 'O25',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      ability: 'Una vez por juego, puedes ver una carta del jugador al que la acabas de mostrar una carta.',
      color: 'blue',
      name: 'Daniela Aránguiz',
      image: 'src/assets/img/characters/daniela-profile.png',
      token: 'src/assets/img/board/blue-token.png',
      initialBox: 'A19',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      ability: 'Una vez por juego, puedes comenzar dos rumores en el mismo turno.',
      color: 'purple',
      name: 'Rodrigo Sepúlveda',
      image: 'src/assets/img/characters/rodrigo-profile.png',
      token: 'src/assets/img/board/purple-token.png',
      initialBox: 'A6',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      ability: 'Una vez por juego, puede moverte dos veces. Tira el dado, muévete, tira de nuevo.',
      color: 'yellow',
      name: 'Karol Dance',
      image: 'src/assets/img/characters/karol-profile.png',
      token: 'src/assets/img/board/yellow-token.png',
      initialBox: 'X8',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      ability: 'Una vez por juego, puedes empezar un rumor en un studio en el que no estés.',
      color: 'green',
      name: 'Tulio Triviño',
      image: 'src/assets/img/characters/tulio-profile.png',
      token: 'src/assets/img/board/green-token.png',
      initialBox: 'J25',
      createdAt: new Date(),
      updatedAt: new Date(),
    }
  ]),
  down: (queryInterface) => queryInterface.bulkDelete('Characters', null, {}),
};