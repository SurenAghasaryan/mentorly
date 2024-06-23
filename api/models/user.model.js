'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      User.hasOne(models.UserInfo, { foreignKey: 'userId', as: 'info' });
      User.hasMany(models.Education, { foreignKey: 'userId', as: 'educations' });
      User.hasMany(models.Experience, { foreignKey: 'userId', as: 'experiences' });
      User.belongsToMany(models.Field, { through: 'UserField', foreignKey: 'userId', as: 'fields' });
    }
  }
  User.init({
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'User',
    tableName: 'users',
  });
  return User;
};
