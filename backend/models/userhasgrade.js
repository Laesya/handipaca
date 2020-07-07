'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class UserHasGrade extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  UserHasGrade.init({
    userId: DataTypes.INTEGER,
    gradeId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'UserHasGrade',
  });
  return UserHasGrade;
};