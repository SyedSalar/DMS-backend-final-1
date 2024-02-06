"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("clients", {
        id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: Sequelize.INTEGER,
          },
          companyId: {
            type: Sequelize.INTEGER,
          },
          email: {
            type: Sequelize.STRING,
            unique:true,
          },
          clientName: {
            type: Sequelize.STRING,
          },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("clients");
  },
};
