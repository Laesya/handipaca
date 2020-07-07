'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      User.belongsTo(models.Role, {foreignKey: 'roleId', targetKey: 'id', as:'role'});
      User.hasMany(models.Type_Handicap, {foreignKey: 'userId'})
    }
  };
  User.init({
    pseudonym: {
      type: DataTypes.STRING,
      validate : {
        len : [3,20]
      }
    },
    email: {
      type: DataTypes.STRING,
      validate : {
        isEmail: true
      }
    },
    password: DataTypes.STRING,
    liveIn: DataTypes.STRING,
    hasHandicap: DataTypes.BOOLEAN,
    roleId: {
      type: DataTypes.INTEGER,
      references : {
        model: 'Roles',
        foreignKey: 'id',
      }
    },
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};