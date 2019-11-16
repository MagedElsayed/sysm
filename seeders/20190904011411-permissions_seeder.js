'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkInsert('People', [{
        name: 'John Doe',
        isBetaMember: false
      }], {});
    */
   return queryInterface.bulkInsert('Permissions', [
    {name: 'grant', code: 1, desc: 'superuser'},
    {name: 'create-admin', code: 2, desc: 'post ads'},
    {name: 'create-ads', code: 3, desc: 'viewing adds'},
    {name: 'create-comment', code: 4, desc: 'viewing adds'},
    {name: 'create-like', code: 5, desc: 'viewing adds'},
    {name: 'create-report', code: 6, desc: 'viewing adds'},
    {name: 'create-coupon', code: 7, desc: 'viewing adds'},
    {name: 'read-ads', code: 13, desc: 'viewing adds'},
    {name: 'read-comment', code: 14, desc: 'viewing adds'},
    {name: 'read-like', code: 15, desc: 'viewing adds'},
    {name: 'read-report', code: 16, desc: 'viewing adds'},
    {name: 'read-coupon', code: 17, desc: 'viewing adds'},
    {name: 'delete-ads', code: 23, desc: 'viewing adds'},
    {name: 'delete-comment', code: 24, desc: 'viewing adds'},
    {name: 'delete-like', code: 25, desc: 'viewing adds'},
    {name: 'delete-report', code: 26, desc: 'viewing adds'},
    {name: 'delete-coupon', code: 27, desc: 'viewing adds'},
    {name: 'update-ads', code: 33, desc: 'viewing adds'},
    {name: 'update-comment', code: 34, desc: 'viewing adds'},
    {name: 'update-like', code: 35, desc: 'viewing adds'},
    {name: 'update-report', code: 36, desc: 'viewing adds'},
    {name: 'update-coupon', code: 37, desc: 'viewing adds'},
    {name: 'approve_user', code: 43, desc: 'viewing adds'},
    {name: 'create-user', code: 43, desc: 'viewing adds'},
    {name: 'delete_user', code: 43, desc: 'viewing adds'},
   ], {})
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('People', null, {});
    */
  }
};
