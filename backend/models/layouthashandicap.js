'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class LayoutHasHandicap extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  LayoutHasHandicap.init({
    layoutId: DataTypes.INTEGER,
    typeHandicapId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'LayoutHasHandicap',
  });
  return LayoutHasHandicap;
};