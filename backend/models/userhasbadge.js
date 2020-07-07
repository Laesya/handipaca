'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class UserHasBadge extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  UserHasBadge.init({
    userId: DataTypes.INTEGER,
    badgeId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'UserHasBadge',
  });
  return UserHasBadge;
};