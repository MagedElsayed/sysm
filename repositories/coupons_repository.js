'use strict';

const path = require('path');
const app = require(path.join(__dirname, '..', 'app'));
const ERRORS = app.get('codes');
const Coupons = require(path.join(__dirname, '..', 'models')).Coupons;
const SequelizeRepository = require('./sequelize_repository');
const appLang = process.env.NODE_LANG || 'ENG';
const env = app.get('env');
const Sequelize = require('sequelize');
const crypto = require('crypto');
const couponGenerator = require('voucher-code-generator');

class CouponsRepository extends SequelizeRepository{
    constructor(){
        super(Coupons);
    }

    generate(uid, aid){
        return this.getOne({userId: uid})
                   .then(res => {
                       if(res) return false;
                       const sha1 = crypto.createHash('sha1');
                       sha1.update((uid).toString()).update((aid).toString()).update(Date.now() .toString());
                       const prefix =  sha1.digest('base64').slice(0, 8) + '-';
                       let coupon = couponGenerator.generate({
                           prefix,
                           length: 10
                       });
                       return this.insert({
                           adsId: aid,
                           ownerId: uid,
                           token: coupon
                       });

                   })
    }
    spent(id, aid){
        return this.update({spent: true}, {id, adsId: aid})
    }
}

module.exports = CouponsRepository;