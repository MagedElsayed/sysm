const cors = require('cors');
const morgan = require('morgan');
const express = require('express');
const bodyParser = require('body-parser');
const app = require('./app');
const db = require('./models');
const path = require('path');
const env = process.env.NODE_ENV || require(path.join(__dirname, 'config/env.json'))['env'] || 'development';
const ERR_CODES = app.get('codes')['ERRORS'];
const seeder = require('./seeders');
// const CONFIG_DIR = path.join(__dirname, 'config');
//establish db connection.
db.sequelize.authenticate()
            .then(() => {
                console.log('Connection established successfully!...');
                if(env === 'development'){
                    return db.sequelize.sync({force: true})
                             .then(() => {
                                 console.log('Database is synced!');
                                 console.log('[development mode]: Running seeders....');
                                 return seeder();
                             })
                }
                return true;
            }).then(() => {
                console.log('READY!');
            }).catch((err) => {
                console.error('Some thing wrong happened....', err);
                process.exit(ERR_CODES.ERR_DBC);
            });


//init app

app.use('/static', express.static(path.join(__dirname, 'public')));
//Third-party middlewares.
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(cors());
app.use(morgan('short'));

//Own middlwares

// app.use('/', (req, res) => res.send({msg: 'hello'}))
app.use('/api', require('./routes/ads'));


//Starting app
app.listen(process.env.NODE_PORT || 8888, (err) => {
    if(err){
        console.log('Error Ocuured, Server can\'t start!....', err);
        process.exit(ERR_CODES.ERR_SRV);
    }
    console.log('Server started successfully!....');
});

//Error handling middleware
app.use(function (err, req, res, next) {
    console.error(err.stack);
    const error = app.get('codes').ERR_WRONG;
    return res.status(500).json({
        error: true,
        msg: error.msg[app.get('lang')],
        code: error.code
    });
  });