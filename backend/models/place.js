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
      Place.belongsToMany(models.Type_Layout, { through: "PlaceHasLayout", foreignKey:"placeId", as :'layouts'});
      Place.belongsTo(models.User, { foreignKey: 'userId', targetKey: 'id' });
      Place.belongsTo(models.Type_Place, { foreignKey: 'typePlaceId', targetKey: 'id', as :'type' });
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