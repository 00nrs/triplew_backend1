module.exports = {
  up: (queryInterface) => queryInterface.bulkInsert('Weapons', [
    {
      name: 'Cuchillo',
      image: 'src/assets/img/weapons/cuchillo.png',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      name: 'Cuerda',
      image: 'src/assets/img/weapons/cuerda.png',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      name: 'Bate',
      image: 'src/assets/img/weapons/bate.png',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      name: 'Hacha',
      image: 'src/assets/img/weapons/hacha.png',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      name: 'Pesa',
      image: 'src/assets/img/weapons/pesas.png',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      name: 'Pistola',
      image: 'src/assets/img/weapons/pistola.png',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      name: 'Candelabro',
      image: 'src/assets/img/weapons/candelabro.png',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      name: 'Veneno',
      image: 'src/assets/img/weapons/veneno.png',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      name: 'Trofeo',
      image: 'src/assets/img/weapons/trofeo.png',
      createdAt: new Date(),
      updatedAt: new Date(),
    }
  ]),
  down: (queryInterface) => queryInterface.bulkDelete('Weapons', null, {}),
};
