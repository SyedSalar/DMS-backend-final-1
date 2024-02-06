"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("projects", {
        id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: Sequelize.INTEGER,
          },
          companyId: {
            type: Sequelize.INTEGER,
            allowNull: false,
          },
          departmentId: {
            type: Sequelize.INTEGER,
            allowNull: false,
          },
          authorId: {
            type: Sequelize.INTEGER,
            allowNull: false,
          },
          authorName: {
            type: Sequelize.STRING,
            allowNull: false,
          },
          clientEmail: {
            type: Sequelize.STRING,
            allowNull: false,
          },
          title: {
            type: Sequelize.STRING,
            unique:true,
            allowNull: false,
          },
          code: {
            type: Sequelize.STRING,
            allowNull: false,
          },
          status: {
            type: Sequelize.STRING,
          },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("projects");
  },
};
