'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('CommunityPersonas', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      CommunityId: {
        type: Sequelize.INTEGER,
        references: {
          model: "Communities",
          key: "id"
        },
        onUpdate: "cascade",
        onDelete: "cascade"
      },
      PersonaId: {
        type: Sequelize.INTEGER,
        references: {
          model: "Personas",
          key: "id"
        },
        onUpdate: "cascade",
        onDelete: "cascade"
      },
      role: {
        type: Sequelize.INTEGER
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('CommunityPersonas');
  }
};