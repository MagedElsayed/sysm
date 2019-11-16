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
   console.log(queryInterface);
   
   return queryInterface.bulkInsert('Roles', [
    {name: 'admin', code: 1, desc: 'superuser'},
    {name: 'publisher', code: 2, desc: 'post ads'},
    {name: 'user', code: 3, desc: 'viewing adds'}
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
