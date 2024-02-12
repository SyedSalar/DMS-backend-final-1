"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("comments", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      docName: {
        type: Sequelize.STRING,
      },
      comments: {
        type: Sequelize.JSON,
      },
    
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("comments");
  },
};
