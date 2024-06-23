'use strict';

module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.bulkInsert('educations', [
            {
                userId: 1,
                startDate: '2016-09-01',
                endDate: '2020-06-01',
                institutionTitle: 'Armenian Politechnical University',
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                userId: 2,
                startDate: '2012-09-01',
                endDate: '2016-06-01',
                institutionTitle: 'Yerevan State University',
                createdAt: new Date(),
                updatedAt: new Date(),
            },
        ], {});
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.bulkDelete('educations', null, {});
    }
};
