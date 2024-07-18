'use strict';
const fs = require("fs").promises;

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    // let users = JSON.parse(await fs.readFile("./data/user.json", "utf-8")).map(el => {
    //   el.createdAt = new Date()
    //   el.updatedAt = new Date()
    //   return el;
    // })
    // let profiles = JSON.parse(await fs.readFile("./data/profile.json", "utf-8")).map(el => {
    //   el.createdAt = new Date()
    //   el.updatedAt = new Date()
    //   return el;
    // })
    // let communities = JSON.parse(await fs.readFile("./data/community.json", "utf-8")).map(el => {
    //   el.createdAt = new Date()
    //   el.updatedAt = new Date()
    //   return el;
    // })
    // let users = JSON.parse(await fs.readFile("./data/user.json", "utf-8")).map(el => {
    //   el.createdAt = new Date()
    //   el.updatedAt = new Date()
    //   return el;
    // })
    // await queryInterface.bulkInsert("")
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
