const { User } = require('../models');

const userdata = [
  {
    username: 'Jurgen',
    password: 'ynwa',
  },
  {
    username: 'Darwin',
    password: 'darwinho',
  },
  {
    username: 'Trent',
    password: 'corner',
  },
  {
    username: 'Bobby',
    password: 'firmino',
  },
];

const seedUser = () => User.bulkCreate(userdata, { individualHooks: true, returning: true });

module.exports = seedUser;