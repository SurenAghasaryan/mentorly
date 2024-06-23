'use strict';

module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.bulkInsert('users', [
            {
                email: 'suren.aghasaryan@gmail.com',
                password: '$2b$10$HMgOtD6m26UF2EU8cQsSn.Uk1uK2zJVwUBID1xZ6QNQmZTbjnKHjq',
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                email: 'poghos.pogghosyan@gmail.com',
                password: '$2b$10$HMgOtD6m26UF2EU8cQsSl.Uk1uK2zJVwUBID1xZ6QNQmZTbjnKHju',
                createdAt: new Date(),
                updatedAt: new Date(),
            },
        ], {});
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.bulkDelete('users', null, {});
    }
};
