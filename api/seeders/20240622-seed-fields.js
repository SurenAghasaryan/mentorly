'use strict';

module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.bulkInsert('fields', [
            {
                name: 'Engineering',
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                name: 'Medicine',
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                name: 'Architecture',
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                name: 'Philosophy',
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                name: 'Music',
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                name: 'Art',
                createdAt: new Date(),
                updatedAt: new Date(),
            },
        ], {});
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.bulkDelete('fields', null, {});
    }
};
