'use strict';

const path = require('path');
const app = require(path.join(__dirname, '..', 'app'));
const ERRORS = app.get('codes');
const Reports = require(path.join(__dirname, '..', 'models')).Reports;
const SequelizeRepository = require(path.join(__dirname, 'sequelize_repository'));

class ReportsRepository extends SequelizeRepository{
    constructor(){
        super(Reports);
    }

    
}

module.exports = ReportsRepository;