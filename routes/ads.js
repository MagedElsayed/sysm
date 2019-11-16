const adsRouter = require('express').Router();
const pageSize = 20;
const adsController = require('../controllers/ads_controller');
const couponsController = require('../controllers/coupons_controller');
const commentsController = require('../controllers/comments_controller');
const likesController = require('../controllers/likes_controller');
const reportsController = require('../controllers/reports_controller');
const {checkRole, loginRequired} = require('../middlewares/auth');
const pager = require('../middlewares/pager');

adsRouter.get('/ads', pager(pageSize), adsController.index);//
adsRouter.get('/ads/most_visted', pager(pageSize), adsController.index);//
adsRouter.get('/ads/most_liked', pager(pageSize), adsController.index);//
adsRouter.get('/ads/expired', pager(pageSize), adsController.index);//
adsRouter.get('/ads/favorite', loginRequired(), adsController.indexFavorit);//
adsRouter.get('/ads/:id', adsController.show);//
adsRouter.post('/ads', loginRequired(), checkRole('publisher'), adsController.create);//
adsRouter.put('/ads/:id', loginRequired(), checkRole('publisher'), adsController.update);//
adsRouter.delete('/ads/:id', loginRequired(), checkRole('publisher'), adsController.destroy);//

adsRouter.get('/ads/dashboard', pager(pageSize), loginRequired(), checkRole('publisher'), adsController.indexPublisher);//
adsRouter.get('/ads/dashboard/coupons', pager(pageSize), loginRequired(), checkRole('publisher'), couponsController.index);//
adsRouter.get('/ads/:id/dashboard/coupons', pager(pageSize), loginRequired(), checkRole('publisher'), couponsController.indexAds);//
adsRouter.put('/ads:ads_id/coupon/:id/spend', loginRequired(), checkRole('publisher'), couponsController.spend);//

adsRouter.get('/ads/:id/likes', likesController.indexForAds);//
adsRouter.post('/ads/:id/like', loginRequired(), likesController.createOnAds);//
adsRouter.post('/ads/:ads_id/comment/:id/like', loginRequired(), likesController.createOnComment);//
adsRouter.delete('/ads/:ads_id/like/:id', loginRequired(), likesController.destroy);//
adsRouter.delete('/ads/:ads_id/comment/:comment_id/like/:id', loginRequired(), likesController.destroy);//

adsRouter.get('/ads/:id/comment', commentsController.index);//
adsRouter.post('/ads/:id/comment', loginRequired(), commentsController.create);//
adsRouter.delete('/ads/:ads_id/comment/:id', loginRequired(), commentsController.destroy);//


adsRouter.get('/ads/:id/report', loginRequired(), checkRole('admin'), reportsController.index);//
adsRouter.post('/ads/:id/report', loginRequired(), reportsController.create);//
adsRouter.delete('/ads/:ads_id/report/:id', loginRequired(), reportsController.destroy);//

adsRouter.get('/ads/:id/coupon/create', loginRequired(), checkRole('user'), couponsController.create);//


module.exports = adsRouter;