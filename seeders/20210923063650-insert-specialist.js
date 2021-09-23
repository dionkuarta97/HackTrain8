'use strict';
const fs = require("fs")

module.exports = {
  up: (queryInterface, Sequelize) => {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
     let readJson = JSON.parse(fs.readFileSync('./Data/specialist.json', 'utf-8'))
     readJson.forEach(el => {
       el.createdAt = new Date()
       el.updatedAt = new Date()
     });
     return queryInterface.bulkInsert('Specialists', readJson)
  },

  down: (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
     return queryInterface.bulkDelete('Specialists', null, {})
  }
};
