'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Field extends Model {
    static associate(models) {
      Field.belongsToMany(models.User, { through: 'UserField', foreignKey: 'fieldId', as: 'users' });
    }
  }
  Field.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'Field',
    tableName: 'fields',
  });
  return Field;
};
