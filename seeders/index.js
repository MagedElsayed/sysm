'use strict';

const fs = require('fs');
const path = require('path');
const basename = path.basename(__filename);
const db = require('../models');

async function appSeeder(){
  // seeders.role_seeder.up(db.sequelize.QueryInterface, db.sequelize);
  // seeders.user_seeder.up(db.sequelize.QueryInterface, db.sequelize);
  // seeders.ads_seeder.up(db.sequelize.QueryInterface, db.sequelize);
  // seeders.permissions_seeder.up(db.sequelize.QueryInterface, db.sequelize);
  // seeders.roles_permissions_seeder.up(db.sequelize.QueryInterface, db.sequelize);
  let roles = await db.Roles.bulkCreate([
    {name: 'admin', code: 1, desc: 'superuser'},
    {name: 'publisher', code: 2, desc: 'post ads'},
    {name: 'user', code: 3, desc: 'viewing adds'}
   ], {individualHooks: true});
   let tags = await db.Tags.bulkCreate([
     {name: 'it'},
     {name: 'food'},
     {name: 'cloths'},
     {name: 'gym'},
     {name: 'tools'},

   ], {individualHooks: true})
   let permissions = await db.Permissions.bulkCreate([
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
    {name: 'create-user', code: 44, desc: 'viewing adds'},
    {name: 'delete_user', code: 45, desc: 'viewing adds'},
   ], {individualHooks: true})
  let users = await db.Users.bulkCreate([{
    firstName: 'maged', lastName: 'magdy', age: 25, gender: 'Male', phone: '01069240190', country: 'EG', city: 'CAIRO', fbAccount: 'www.facebook.com/Maged.21', username: 'magedmagdy', email: 'magedmagdy105@gmail.com', password: '123456', activatoinState: 'ACTIVATED', roleId: 1
   }, {
    firstName: 'ahmed', lastName: 'wafik', age: 25, gender: 'Male', phone: '01069242190', country: 'EG', city: 'CAIRO', fbAccount: 'www.facebook.com/wafik.21', username: 'wafik', email: 'wafik@gmail.com', password: '123456', activatoinState: 'ACTIVATED', roleId: 2
   }, {
    firstName: 'ahmed', lastName: 'naguib', age: 25, gender: 'Male', phone: '01063240190', country: 'EG', city: 'CAIRO', fbAccount: 'www.facebook.com/Maged.21', username: 'naguib', email: 'naguib@gmail.com', password: '123456', activatoinState: 'PENDING', roleId: 2
   }, {
    firstName: 'marwa', lastName: 'sakr', age: 25, gender: 'Female', phone: '01063340190', country: 'EG', city: 'CAIRO', fbAccount: 'www.facebook.com/Maged.21', username: 'marwa', email: 'marwa@gmail.com', password: '123456', activatoinState: 'ACTIVATED', roleId: 3
   }, {
    firstName: 'amr', lastName: 'waly', age: 25, gender: 'Male', phone: '01069249190', country: 'EG', city: 'CAIRO', fbAccount: 'www.facebook.com/amr.21', username: 'amr', email: 'amr@gmail.com', password: '123456', activatoinState: 'ACTIVATED', roleId: 3
   }], {individualHooks: true});

   let ads = await db.Ads.bulkCreate([
     {title: "new resturant", content: "hello friends", expirey_date: Date.now() + 60*60*24*2, visit_count: 1, orgnization: "IBM", org_location: "smart village", discount: 40, publisherId: 3 },
     {title: "hotels", content: "hello friends", expirey_date: Date.now() + 60*60*24*2, visit_count: 1, orgnization: "blala", org_location: "abo dhabi", discount: 44, publisherId: 3},
     {title: "new company", content: "hello friends", expirey_date: Date.now() + 60*60*24*2, visit_count: 1, orgnization: "foo", org_location: "Madinah", discount: 80, publisherId: 2},
     {title: "new gym", content: "hello friends", expirey_date: Date.now() + 60*60*24*2, visit_count: 1, orgnization: "bar", org_location: "Jadah", discount: 10, publisherId: 2}
   ], {individualHooks: true});
  
  await ads[0].setTags([tags[0], tags[1]])
  await ads[1].setTags([tags[0], tags[1], tags[2]])
  await ads[2].setTags([tags[1]])
  await ads[3].setTags([tags[1], tags[3]])
}

module.exports = appSeeder;
