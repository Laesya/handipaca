'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Type_Layout extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Type_Layout.belongsToMany(models.Place, { through: "PlaceHasLayout", foreignKey:"layoutId", as: 'places'});
      Type_Layout.belongsTo(models.User, { foreignKey: 'userId', targetKey: 'id' });
    }
  };
  Type_Layout.init({
    name: DataTypes.STRING,
    isValid: DataTypes.BOOLEAN,
    userId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Type_Layout',
  });
  return Type_Layout;
};