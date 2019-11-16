const AdsRepository = require('../repositories/ads_repository');
const adsRepo = new AdsRepository();

const getAds = (currentUser=false, withId=false, idField='id') => {
    return (req, res) => {
        let where = {};
        let func = withId? adsRepo.getAds : adsRepo.getAllAds.bind(adsRepo, false);
        let {pgSize:limit, start:offset} = (!withId && req.pageSettings) || {pgSize: undefined, start: undefined};
        if(withId) where[idField] = req.params.id;
        else if(currentUser) where.publisher_id = req.user.id;
        console.log(func);
        
        return func(where, {limit, offset})
        .then((results) => {
            // console.log(results[0]);
            results = results.map(ads => {
                ads = ads.toJSON();
                ads.tags = ads.tags.map(tag => tag.name);
                // console.log(ads.toJSON());
                
                return ads;
            });
                   
                   return res.json({
                       success: true,
                       data: results
                   });
               }).catch(err => {
                   console.error(err);
                   return res.json({
                       success: false,
                       err
                   });
               });
    };
};

const getFavouriteAds = (req, res) => {
    let {pgSize:limit, start:offset} = req.pageSettings || {pgSize: undefined, start: undefined};
    return adsRepo.getAllAdsFavored(req.user.id, {limit, offset})
                  .then(ads => {
                      return res.json({
                          success: true,
                          data: ads
                      });
                  }).catch(err => {
                      return res.json({
                          success: false,
                          err
                      });
                  });
};

const createAds = (req, res) => {
    return adsRepo.createAds(req.body)
                  .then(created => {
                      if(!created) throw new Error('Couldn\'t create ads');
                      return res.json({
                          success: true,
                          data: created
                      });
                  }).catch(err => {
                    return res.json({
                        success: false,
                        err
                    });
                  });
};
const updateAds = (req, res) => {
    return adsRepo.updateAds(req.body, {id: req.params.id})
                  .then(updated => {
                      if(!updated) throw new Error('Couldn\'t update ads');
                      return res.json({
                          success: true,
                          data: updated
                      });
                  }).catch(err => {
                    return res.json({
                        success: false,
                        err
                    });
                  });
};

const destroyAds = (req, res) => {
    return adsRepo.delete({id: req.params.id})
                  .then(deleted => {
                      if(!deleted) throw new Error('Couldn\'t delete ads');
                      return res.json({
                          success: true,
                          data: deleted
                      });
                  }).catch(err => {
                    return res.json({
                        success: false,
                        err
                    });
                  });
}
module.exports.index = getAds();
module.exports.indexFavorit = getFavouriteAds;
module.exports.indexPublisher = getAds(true);
module.exports.show = getAds(false, true);
module.exports.create = createAds;
module.exports.update = updateAds;
module.exports.destroy = destroyAds;