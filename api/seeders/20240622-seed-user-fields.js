'use strict';

module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.bulkInsert('user_field', [
            {
                userId: 1,
                fieldId: 1,
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                userId: 2,
                fieldId: 1,
                createdAt: new Date(),
                updatedAt: new Date(),
            },
        ], {});
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.bulkDelete('user_field', null, {});
    }
};
