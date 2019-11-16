let paginator = function( pgSize=50, qsName="page"){

    return (req, res, next) => {
            let start = 1;
            page = req.query[qsName];

            if(page && page >= 0)
                    start = (page - 1) * pgSize;
            req.pageSettings = {pgSize, start};
            next();
    }
}
module.exports = paginator;