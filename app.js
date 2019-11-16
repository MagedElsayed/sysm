const app = require('express')();
const path = require('path');
const env = process.env.NODE_ENV || require(path.join(__dirname, 'config/env.json'))['env'] || 'development';
const CONFIG_DIR = path.join(__dirname, 'config');
const config = require(path.join(CONFIG_DIR, 'config.json'));
const DEFAULT_SECRET = 'whydontyoumakeanewsecret';
const DEFAULT_LANGUAGE = 'ENG';


module.exports = app;


const APP_GLOBALS = {
    'view engine': 'ejs',
    'views': 'views',
    'env': env,
    'config dir': CONFIG_DIR,
    'helpers dir': path.join(__dirname, 'helpers'),
    'helpers': require(path.join(__dirname, 'helpers')),
    'config file': path.join(CONFIG_DIR, 'config.json'),
    'codes file': path.join(CONFIG_DIR, 'codes.json'),
    'config': config,
    'codes': require(path.join(CONFIG_DIR, 'codes.json')),
    'lang': process.env.NODE_LANG || config[env].app_lang || DEFAULT_LANGUAGE,
    'jwt_secret': process.env.NODETOKEN_SECRET || config[env].token_secret || DEFAULT_SECRET
};

/**
 * for loading some data at app startup and save it in the app for faster retrieval.
 * usefull for frequently retrieved 
 */
const STARTUP_LOADS = [

]

app.configure = function(config){
    for(let k of Object.keys(config))
        this.set(k, config[k]);
    return this;
};
app.configure(APP_GLOBALS);

// app.set('view engine', 'ejs');
// app.set('views', 'views');
// app.set('env', env);
// app.set('config dir', CONFIG_DIR);
// app.set('config file', path.join(CONFIG_DIR, 'config.json'));
// app.set('codes file', path.join(CONFIG_DIR, 'codes.json'));
// app.set('config', require(app.get('config file')));
// app.set('codes', require(app.get('codes file')));
// app.set('lang', process.env.NODE_LANG || app.get('config')[env] || 'ENG');
