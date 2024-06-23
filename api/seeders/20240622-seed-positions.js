'use strict';

module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.bulkInsert('positions', [
            {
                title: 'Senior Developer',
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                title: 'Junior Developer',
                createdAt: new Date(),
                updatedAt: new Date(),
            },
        ], {});
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.bulkDelete('positions', null, {});
    }
};
