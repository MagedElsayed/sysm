const codes = require('./codes.json');
const codesObj = {}

function processCodes(codes, namespace=null) {
    let obj = {};
    let prefix = (namespace? namespace + '.' : '');
    console.log(prefix);
    
    for(let key in codes) {
        if(!codes[key].code){
            console.log(prefix, key, namespace);
            
            Object.assign(obj, processCodes(codes[key], prefix + key));
        }
        else {
            obj[prefix + key] = codes[key] 
        }
    }
    return obj
}
let lang = 'AR';
let errorCodes = processCodes(codes);
console.log(errorCodes);

new Proxy(errorCodes, {
    get: (target, prop) => {
        return {
            code: target[prop].code,
            msg: target[prop].msg[lang]
        }
    }
})