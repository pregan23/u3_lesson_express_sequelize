'use strict'
const faker = require('faker')
const users = [...Array(100)].map(() => ({
  name: faker.name.firstName(),
  email: faker.internet.email(),
  password: faker.internet.password()
}))
module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('users', users)
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('users')
  }
}
