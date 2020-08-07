'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Type_Place extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Type_Place.belongsTo(models.User, {foreignKey: 'userId', targetKey: 'id' });
      Type_Place.hasMany(models.Place, { as: 'places' });
    }
  };
  Type_Place.init({
    name: DataTypes.STRING,
    isValid: DataTypes.BOOLEAN,
    userId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Type_Place',
  });
  return Type_Place;
};