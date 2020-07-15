'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Place extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Place.belongsToMany(models.Layout, { through: "PlaceHasLayouts", foreignKey:"placeId", as: 'layouts', otherKey: "layoutId"})
    }
  };
  Place.init({
    name: DataTypes.STRING,
    street: DataTypes.STRING,
    nbStreet: DataTypes.STRING,
    city: DataTypes.STRING,
    zip: DataTypes.INTEGER,
    note: DataTypes.DECIMAL,
    typePlaceId: DataTypes.INTEGER,
    userId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Place',
  });
  return Place;
};