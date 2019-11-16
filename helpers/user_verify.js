const path = require('path');
const app = require(path.join(__dirname, '..', 'app'));
const ERRORS = app.get('codes').ERRORS;
const appLang = app.get('lang');
function verificationHandler(userId, roleId){
    let roles = app.get('roles');
    if(!roles){
        console.error('Error ' + ERRORS.ROLES_NOT_FOUND.code + ' : ' + ERRORS.ROLES_NOT_FOUND.msg[appLang]);
        return false;
    }
    roles[roleId]
}

const strategies = {
    email: XMLDocument,
    admin: XMLDocument
}