'use strict';

const path = require('path');
const app = require(path.join(__dirname, '..', 'app'));
const ERRORS = app.get('codes');
const Users = require(path.join(__dirname, '..', 'models')).Users;
const SequelizeRepository = require(path.join(__dirname, 'sequelize_repository'));
const appLang = process.env.NODE_LANG || 'ENG';
const env = app.get('env');

class UserRepository extends SequelizeRepository{
    constructor(){
        super(Users);
        const bind_args_from_n = app.get('helpers').bind_from;
        this.getWithRole = bind_args_from_n(this.getOne, this, 2, [{association: 'role'}]);
        this.getWithRoleAndPermissions = bind_args_from_n(this.getOne, this, 2, [
            {
                association: 'role', 
                include: [{association: 'permissions'}]
            }
        ]);

    }

    hasAnyRole(id, roles, pkName='id', roleFieldName='name'){
        return this.getOne({[pkName]: id}, [{association: 'role'}])
             .then((user) => {
               if(!user){
                 console.error('ERROR ' + ERR_USER.NOT_FOUND.code + ': ' + ERR_USER.NOT_FOUND.msg[appLang]);
                 return false;
               }
               if(Array.isArray(roles) && roles.includes(user.role[roleFieldName])){
                 return true;
               } else return user.role[roleFieldName] === roles;
             }).catch((err) => {
               console.error('ERROR ' + ERRORS.ERR_WRONG.code + ': ' + ERRORS.ERR_WRONG.msg[appLang], err);
               return false;
             });
    }

    isPermitted(id, action){
        return this.getWithRoleAndPermissions(id)
                   .then(user => {
                       if(!user){
                        console.error('ERROR ' + ERR_USER.NOT_FOUND.code + ': ' + ERR_USER.NOT_FOUND.msg[appLang]);
                        return false;
                       }
                       let actionName = user.role.permissions.filter(perm => perm.name === 'action');
                       return actionName.length > 0;
                   }).catch(err => {
                       console.error('ERROR ' + ERR_USER.NOT_FOUND.code + ': ' + ERR_USER.NOT_FOUND.msg[appLang]);
                       return false;
                   });
    }
    getAllWithActivationState(activationState){
        return this.getAll({activationState});

    }
    getAllActivated(){
        return this.getAllWithActivationState('ACTIVATED');
    }
    getAllPending(){
        return this.getAllWithActivationState('PENDING');
    }
    getAllCanceled(){
        return this.getAllWithActivationState('CANCELED');
    }

    createWithRole(role){
        if(typeof role === 'number'){
            return this.create
        }
    }
    createAdmin(data){
        data.role_id
        return this.insert(da)
    }
    setActivationState(state, id, pkName='id', callback=null){
        return this.update({
            activationState: state
        }, {
            [pkName]: id
        }, callback);
    }
    setActive(id, pkName='id', callback=null){
        return this.setActivationState('ACITVATED', id, pkName, callback);
    }
    setCanceled(id, pkName='id', callback=null){
        return this.setActivationState('CANCELED', id, pkName, callback);
    }
    activate(id, code, pkName, callback=null){
        return this.getOne({[pkName]: id}, [{association: 'activation_code'}])
            .then(user => {
                if(!user){
                    console.error('ERROR ' + ERR_USER.NOT_FOUND.code + ': ' + ERR_USER.NOT_FOUND.msg[appLang]);
                    return {
                        success: false,
                        error: ERR_USER.NOT_FOUND.code
                    };
                }
                if(!user.code){
                    console.error('ERROR ' + ERR_USER.NO_ACTIVATION_KEY.code + ': ' + ERR_USER.NO_ACTIVATION_KEY.msg[appLang]);
                    return {
                        success: false,
                        error: ERR_USER.NO_ACTIVATION_KEY.code
                    };
                }
                if(user.code.createdAt < (Date.now() - app.get('config')[env].activation_key_lifetime)){
                    console.error('ERROR ' + ERR_USER.ACTIVATION_KEY_EXPIRED.code + ': ' + ERR_USER.ACTIVATION_KEY_EXPIRED.msg[appLang]);
                    return {
                        success: false,
                        error: ERR_USER.ACTIVATION_KEY_EXPIRED
                    };
                }
                if(user.code.activationCode !== code){
                    console.error('ERROR ' + ERR_USER.ACTIVATION_KEY_NOT_MATCHED.code + ': ' + ERR_USER.ACTIVATION_KEY_NOT_MATCHED.msg[appLang]);
                    return {
                        success: false,
                        error: ERR_USER.ACTIVATION_KEY_NOT_MATCHED
                    };
                }
                return this.setActive(id).then((affectedCount) => {
                    if(!affectedCount){
                        console.error('ERROR ' + ERR_USER.CANT_ACTIVATE.code + ': ' + ERR_USER.CANT_ACTIVATE.msg[appLang]);
                        return {
                            success: false,
                            error: ERR_USER.CANT_ACTIVATE
                        };
                    }
                    return user.code.destroy().then(() => {
                        return {
                            success: true
                        };
                    });
                })
                // this.model.update({activationState: "ACITVE"}, {
                //     include: [{association: 'activatoin_code', where: {createdAt: {
                //         [Sequelize.lt]: (Date.now() - app.get('config')[env].activation_key_lifetim)
                //     },
                //     activationCode: code}}],
                //     where: {
                //         [pkName]: id
                //     }
                // })
            })
    }
    verificationHandler(userId, roleId){
        app.verificationHandler(userId, roleId);
    }
    register(data, roleId, callback=null){
        let user = Object.assign(data, {activationState: "PENDING", roleId});
        return this.insert(user)
                   .then(user => {
                       if(!user){
                            console.error('ERROR ' + ERR_USER.CANT_CREATE.code + ': ' + ERR_USER.CANT_CREATE.msg[appLang]);
                            return {
                                success: false,
                                error: ERR_USER.CANT_CREATE.code
                            };
                       }

                   })
    }
    comment(userId, adsId, content, callback=null){

    }
    like(userId, adsId, content, callback=null){

    }
    
}


