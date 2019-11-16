'use strict';

const path = require('path');
const ERRORS = require(path.join(__dirname, '..', 'config', 'codes.json'));
const Roles = require(path.join(__dirname, '..', 'models')).Roles;
const SequelizeRepository = require(path.join(__dirname, 'sequelize_repository'));
const appLang = process.env.NODE_LANG || 'ENG';

class RolesRepository extends SequelizeRepository{
    constructor(model){
        super(model);
    }

    getUsersWithRole(role, role_field='name'){
        return this.getOne({[role_field]: role}, [{association: 'users', include: [{association: 'permissions'}]}])
               .then((role) => {
                   if(!role){
                       console.error('ERROR' + ERRORS.ERR_NOTFOUND.code + ': ' + ERRORS.ERR_NOTFOUND.msg[appLang]);
                       return false;
                   }
                   return role.users;
               }).catch((err) => {
                   console.error('ERROR' + ERRORS.ERR_NOTFOUND.code + ': ' + ERRORS.ERR_NOTFOUND.msg[appLang]);
                   return false;    
               });
    }
    
}