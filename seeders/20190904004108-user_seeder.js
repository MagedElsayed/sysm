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
   return queryInterface.bulkInsert('sers', [{
    firstName: 'maged', lastName: 'magdy', age: 25, gender: 'Male', phone: '01069240190', country: 'EG', city: 'CAIRO', fbAccount: 'www.facebook.com/Maged.21', username: 'magedmagdy', email: 'magedmagdy105@gmail.com', password: '123456', activatoinState: 'ACTIVATED', roleId: 1
   }, {
    firstName: 'ahmed', lastName: 'wafik', age: 25, gender: 'Male', phone: '01069242190', country: 'EG', city: 'CAIRO', fbAccount: 'www.facebook.com/wafik.21', username: 'wafik', email: 'wafik@gmail.com', password: '123456', activatoinState: 'ACTIVATED', roleId: 2
   }, {
    firstName: 'ahmed', lastName: 'naguib', age: 25, gender: 'Male', phone: '01063240190', country: 'EG', city: 'CAIRO', fbAccount: 'www.facebook.com/Maged.21', username: 'naguib', email: 'naguib@gmail.com', password: '123456', activatoinState: 'PENDING', roleId: 2
   }, {
    firstName: 'marwa', lastName: 'sakr', age: 25, gender: 'Female', phone: '01063340190', country: 'EG', city: 'CAIRO', fbAccount: 'www.facebook.com/Maged.21', username: 'marwa', email: 'marwa@gmail.com', password: '123456', activatoinState: 'ACTIVATED', roleId: 3
   }, {
    firstName: 'amr', lastName: 'waly', age: 25, gender: 'Male', phone: '01069249190', country: 'EG', city: 'CAIRO', fbAccount: 'www.facebook.com/amr.21', username: 'amr', email: 'amr@gmail.com', password: '123456', activatoinState: 'ACTIVATED', roleId: 3
   }], {})
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
