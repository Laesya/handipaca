'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Type_Handicap extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Type_Handicap.belongsTo(models.User, { foreignKey: 'userId', targetKey: 'id' });
    }
  };
  Type_Handicap.init({
    name: DataTypes.STRING,
    isValid: DataTypes.BOOLEAN,
    userId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Type_Handicap',
  });
  return Type_Handicap;
};