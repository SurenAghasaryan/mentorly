'use strict';

module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.bulkInsert('user_info', [
            {
                userId: 1,
                name: 'Suren',
                surname: 'Aghasaryan',
                type: 'mentor',
                positionId: 1,
                description: 'Senior Developer',
                about: 'I want to pass interview :D',
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                userId: 2,
                name: 'Poghos',
                surname: 'Poghosyan',
                type: 'mentee',
                positionId: 2,
                description: 'Junior Developer',
                about: 'Where is my mentor Suren :D',
                createdAt: new Date(),
                updatedAt: new Date(),
            },
        ], {});
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.bulkDelete('user_info', null, {});
    }
};
