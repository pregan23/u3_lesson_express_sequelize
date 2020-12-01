'use strict'
const { User, sequelize } = require('../models')
const faker = require('faker')
module.exports = {
  up: async (queryInterface, Sequelize) => {
    const twerts = await Promise.all(
      [...Array(400)].map(async () => {
        let user = await User.findOne({ order: sequelize.random(), raw: true })
        return {
          content: faker.lorem.paragraph(),
          likes: faker.random.number({ max: 40000 }),
          owner_id: user.id
        }
      })
    )
    return queryInterface.bulkInsert('twerts', twerts)
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('twerts')
  }
}
