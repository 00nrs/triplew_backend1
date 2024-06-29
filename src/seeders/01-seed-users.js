const bcrypt = require('bcrypt');

const hashPassword = async (password) => {
  const saltRounds = 10;
  return await bcrypt.hash(password, saltRounds);
};

module.exports = {
  up: async (queryInterface) => {
    const users = [
      {
        username: 'sofucita',
        password: await hashPassword('aditabonita'),
        mail: 'sretamales@uc.cl',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        username: 'harrypotter',
        password: await hashPassword('ginnyweasley'),
        mail: 'harrypotter@gmail.com',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        username: 'lisasimpson',
        password: await hashPassword('boladenieve'),
        mail: 'lisasimpson@gmail.com',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        username: 'arenita',
        password: await hashPassword('nosomosponcias'),
        mail: 'arenita@gmail.com',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        username: 'magditajesus',
        password: await hashPassword('samiteamo'),
        mail: 'magdita@uc.cl',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        username: 'penelope',
        password: await hashPassword('collinmiamor'),
        mail: 'penelope@gmail.com',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        username: 'sospechosa12',
        password: await hashPassword('donfrancisco'),
        mail: 'cherrera@gmail.com',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        username: 'magda0n',
        password: await hashPassword('flores11'),
        mail: 'mjceronu@uc.cl',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        username: 'detective300',
        password: await hashPassword('31minutos'),
        mail: 'frodriguez@gmail.com',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        username: 'melisa11',
        password: await hashPassword('neopets'),
        mail: 'loquita@gmail.com',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        username: 'admin',
        password: await hashPassword('admin123!!'),
        mail: 'admin@gmail.com',
        createdAt: new Date(),
        updatedAt: new Date(),
      }
    ];

    await queryInterface.bulkInsert('Users', users, {});
  },
  down: (queryInterface) => queryInterface.bulkDelete('Users', null, { truncate: true, cascade: true }),
};
