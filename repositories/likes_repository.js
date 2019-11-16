'use strict';

const path = require('path');
const app = require(path.join(__dirname, '..', 'app'));
const ERRORS = app.get('codes');
const Likes = require(path.join(__dirname, '..', 'models')).Likes;
const SequelizeRepository = require(path.join(__dirname, 'sequelize_repository'));

class LikesRepository extends SequelizeRepository{
    constructor(){
        super(Likes);
    }

    
}

module.exports = LikesRepository;