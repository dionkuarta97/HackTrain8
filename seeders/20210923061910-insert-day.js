'use strict';
const fs = require("fs")

// console.log(readJson)
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
     let readJson = JSON.parse(fs.readFileSync('./Data/day.json', 'utf-8'))
     readJson.forEach(el => {
       el.createdAt = new Date()
       el.updatedAt = new Date()
     });
     return queryInterface.bulkInsert('Days', readJson)
  },

  down: (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
     return queryInterface.bulkDelete('Days', null, {})
  }
};
