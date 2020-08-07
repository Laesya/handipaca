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
      PlaceHasLayout.belongsTo(models.Place, { foreignKey: 'placeId' });
      PlaceHasLayout.belongsTo(models.Type_Layout, { foreignKey: 'layoutId' });
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