'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Layout extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Layout.belongsToMany(models.Place, { through: "PlaceHasLayouts", foreignKey:"layoutId", as: "places", otherKey:"placeId"})
    }
  };
  Layout.init({
    name: DataTypes.STRING,
    userId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Layout',
  });
  return Layout;
};