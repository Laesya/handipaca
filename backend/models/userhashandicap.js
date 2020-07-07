'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class UserHasHandicap extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  UserHasHandicap.init({
    userId: DataTypes.INTEGER,
    typeHandicapId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'UserHasHandicap',
  });
  return UserHasHandicap;
};