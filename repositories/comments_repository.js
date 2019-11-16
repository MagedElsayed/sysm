'use strict';

const path = require('path');
const app = require(path.join(__dirname, '..', 'app'));
const ERRORS = app.get('codes');
const Comments = require(path.join(__dirname, '..', 'models')).Comments;
const SequelizeRepository = require(path.join(__dirname, 'sequelize_repository'));

class CommentsRepository extends SequelizeRepository{
    constructor(){
        super(Comments);
    }

    
}

module.exports = CommentsRepository;