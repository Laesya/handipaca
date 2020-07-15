'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class PlaceHasLayout extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      PlaceHasLayout.belongsTo(models.Place);
      PlaceHasLayout.belongsTo(models.Layout)
    }
  };
  PlaceHasLayout.init({
    placeId: DataTypes.INTEGER,
    layoutId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'PlaceHasLayout',
  });
  return PlaceHasLayout;
};