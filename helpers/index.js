'use strict';

const fs = require('fs');
const path = require('path');
const basename = path.basename(__filename);
const helpers = {
  __dirs: {}
};


fs
  .readdirSync(__dirname)
  .filter(file => {
    return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
  })
  .forEach(file => {
    // const helper = require(path.join(__dirname, file));
    
    helpers.__dirs[file.slice(0, -3)] = path.join(__dirname, file);
  });

//for loading helpers when they are first needed.
const helpers_proxy = new Proxy(helpers, {
  get: (target, name) => {
    if(target[name]) return target[name];
    // console.log(target.__dirs[name], target.__dirs, name)
    if(!(name in target.__dirs)) return undefined;
    target[name] = require(target.__dirs[name]);
    return target[name];
  }
})

module.exports = helpers_proxy;
