'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Alert extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Alert.init({
    placeId: DataTypes.INTEGER,
    name: DataTypes.BOOLEAN,
    street: DataTypes.BOOLEAN,
    nbStreet: DataTypes.BOOLEAN,
    city: DataTypes.BOOLEAN,
    zip: DataTypes.BOOLEAN,
    note: DataTypes.BOOLEAN,
    typePlaceId: DataTypes.BOOLEAN,
    comment: DataTypes.STRING,
    userId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Alert',
  });
  return Alert;
};