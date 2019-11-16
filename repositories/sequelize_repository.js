'use strict';


class SequelizeRepository{
    constructor(model){
        if(new.target === SequelizeRepository) throw TypeError("Repository class can't be instantiated.");
        this.model = model;
    }

    getAll(cond={}, include=[], options={}, callback=null){
        let filter = Object.assign({where: cond, include}, options);
        console.log(filter)
        return (callback? this.model.findAll(filter, callback) : this.model.findAll(filter));
    }

    getOne(cond={}, include=[], options={}, callback=null){
        let filter = Object.assign({where: cond, include}, options);
        return (callback? this.model.findOne(filter, callback) : this.model.findONe(filter));
    }

    update(values, cond={}, callback=null){
        return (callback? this.model.update(values, {where: cond}, callback) : this.model.update(values, {where: cond}));
    }
    
    delete(cond={}, callback=null){
        return (callback? this.model.destroy(cond, callback) : this.model.destroy(cond));
    }

    insert(data, callback=null){
        let insertFunc = this.model.create;
        if(Array.isArray(data)) insertFunc = this.model.bulkCreate;
        return (callback? insertFunc(data, callback) : insertFunc(data));
    }
    
}

module.exports = SequelizeRepository;