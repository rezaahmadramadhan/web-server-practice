'use strict';

const { hashPassword } = require('../helpers/bcrypt');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const user = require('../user.json', 'utf-8').map(el => {
      delete el.id
      el.password = hashPassword(el.password)
      el.createdAt = el.updatedAt = new Date()
      return el
    })

    const grocery = require('../grocery.json', 'utf-8').map(el => {
      delete el.id
      el.createdAt = el.updatedAt = new Date()
      return el
    })
  
    await queryInterface.bulkInsert('Users', user)
    await queryInterface.bulkInsert('Groceries', grocery)
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Groceries', null, {})
    await queryInterface.bulkDelete('Users', null, {})
  }
};
