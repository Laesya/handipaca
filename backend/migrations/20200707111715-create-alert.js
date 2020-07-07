'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Alerts', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      placeId: {
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.BOOLEAN
      },
      street: {
        type: Sequelize.BOOLEAN
      },
      nbStreet: {
        type: Sequelize.BOOLEAN
      },
      city: {
        type: Sequelize.BOOLEAN
      },
      zip: {
        type: Sequelize.BOOLEAN
      },
      note: {
        type: Sequelize.BOOLEAN
      },
      typePlaceId: {
        type: Sequelize.BOOLEAN
      },
      comment: {
        type: Sequelize.STRING
      },
      userId: {
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
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Alerts');
  }
};