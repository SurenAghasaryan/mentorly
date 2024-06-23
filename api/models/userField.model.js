'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class UserField extends Model {
        static associate(models) { }
    }
    UserField.init({
        userId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'users',
                key: 'id'
            },
            onUpdate: 'CASCADE',
            onDelete: 'CASCADE',
            primaryKey: true
        },
        fieldId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'fields',
                key: 'id'
            },
            onUpdate: 'CASCADE',
            onDelete: 'CASCADE',
            primaryKey: true
        }
    }, {
        sequelize,
        modelName: 'UserField',
        tableName: 'user_field',
    });
    return UserField;
};
