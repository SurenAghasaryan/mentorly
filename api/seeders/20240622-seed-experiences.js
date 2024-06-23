'use strict';

module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.bulkInsert('experiences', [
            {
                userId: 1,
                startDate: '2018-07-01',
                endDate: '2020-07-01',
                companyName: 'Priotix',
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                userId: 1,
                startDate: '2020-07-01',
                endDate: '2022-07-01',
                companyName: 'HackTech',
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                userId: 2,
                startDate: '2023-08-01',
                endDate: '2024-01-01',
                companyName: 'Google',
                createdAt: new Date(),
                updatedAt: new Date(),
            },
        ], {});
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.bulkDelete('experiences', null, {});
    }
};
