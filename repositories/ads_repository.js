'use strict';

const path = require('path');
// const app = require(path.join(__dirname, '..', 'app'));
const app = require('../app');

const ERRORS = app.get('codes');
const Ads = require(path.join(__dirname, '..', 'models')).Ads;
const SequelizeRepository = require(path.join(__dirname, 'sequelize_repository'));
const appLang = process.env.NODE_LANG || 'ENG';
const env = app.get('env');
const Sequelize = require('sequelize');

class AdsRepository extends SequelizeRepository{
    constructor(){
        super(Ads);
    }
    getAllAds(detailed=true, cond={}, options={}){
        let include = [
            {
                association: 'comments',
                // attributes: []
            },
            {
                association: 'publisher'
            },
            {   
                association: 'tags'
            },
            {
                association: 'likes',
                // attributes: [] //sequelize adds id by defalt. problem with aggregation.
            },
            {
                association: 'attachments',
            }
        ];
        // options.attributes = {include: [[Sequelize.fn('count', Sequelize.col('likes.id')), 'likes_count']]}
        // if(!detailed){
        //     options.attributes.include.push([Sequelize.fn('count', Sequelize.col('comments.id')), 'comments_count']);
        //     // include[include.length - 1].where = {attType: 'IMAGE'};
        // }
        options.group = 'Ads.id'
        return this.getAll(cond, include, options);
    }
    getDetailedAds(cond={}, options={}){
        return this.getAllAds(true, cond, options)
    }
    getSummedAds(cond={}, options={}){
        return this.getAllAds(false, cond, options)
    }
    getAds(where){
        let include = [
            {
                association: 'comments',
            },
            {
                association: 'publisher'
            },
            {   
                association: 'tags'
            },
            {
                association: 'likes',
                attributes: [[Sequelize.fn('count', Sequelize.col('id')), 'count']]
            },
            {
                association: 'attachments',
            }
        ];

        return this.getOne(where, include);
    }
    comment(userId, adsId, content, callback=null){

    }
    like(userId, adsId, content, callback=null){

    }
    getAllAdsFavored(uid, options={}){
        let include = [
            {
                association: 'comments',
                attributes: [[Sequelize.fn('count', Sequelize.col('id'), 'count')]]
            },
            {
                association: 'publisher'
            },
            {   
                association: 'tags'
            },
            {
                association: 'likes',
                attributes: [[Sequelize.fn('count', Sequelize.col('id')), 'count']]
            },
            {
                association: 'attachments',
                where: {attType: 'IMAGE'}
            }
        ];

        return this.getAll({'$likes.user_id': uid}, include, options);
    }
    createAds(adsData){
        let data = this.permitParams(adsData, ['content', 'expirey_date', 'orgnization', 'org_location', 'discount']);
        return this.insert(data);
    }

    permitParams(body, permits){
        let filteredBody = {};
        for(let key of Object.keys(body)){
            if(permits.includes(key)){
                filteredBody[key] = body[key];
            }
        }
        return filteredBody;
    }
    updateAds(adsData, cond){
        let data = this.permitParams(adsData, ['content', 'expirey_date', 'orgnization', 'org_location', 'discount']);
        return this.update(data, cond);
    }
}
/**
 * /ads/
 */

module.exports = AdsRepository;