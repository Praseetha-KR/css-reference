var express    = require('express'),
    bodyParser = require('body-parser'),
    mongoose   = require('mongoose'),
    router     = express.Router(),
    CssRef     = require('../models/cssref'),
    sanitize   = require('../utils/sanitize');

module.exports = router;
/**
 * Log details of req
 */
router.use(function(req, res, next) {
    console.log(req.method + ' ' +
        req.baseUrl + req.url + ' ' +
        res.statusCode + ' ' +
        req.headers.host + ' ' +
        req.headers['user-agent']
    );
    next();
});
/**
 * Router middleware to validate :name
 */
router.param('name', function(req, res, next, name) {
    CssRef.findOne({ name: name }, function(err, cssref) {
        if (err) return next(err);
        if (!cssref) {
            var err = new Error();
            err.status = 404;
            err.message = 'Reference not found'
            return next(err);
        }
        req.cssref = cssref;
        next();
    });
});

/**
 * API Routes
 */
router.get('/', function(req, res) {
    res.json({ message: 'Welcome to CSS Reference API' });
});

router.route('/css')
    .post(function(req, res) {
        var cssref = new CssRef();
        cssref.name = req.body.name;

        cssref.save(function(err) {
            if (err) res.send(err);
            res.json(sanitize(cssref));
        });
    })
    .get(function(req, res) {
        CssRef.find(function(err, cssrefs) {
            if (err) res.send(err);
            cssrefs = cssrefs.map(function(obj) {
                return sanitize(obj)
            });
            res.json(cssrefs);
        })
    });

router.route('/css/:name')
    .get(function(req, res, next) {
        CssRef.findOne({ name: req.params.name }, function(err, cssref) {
            if (err) return next(err);
            res.json(sanitize(cssref));
        });
    })
    .put(function(req, res) {
        CssRef.findOne({ name: req.params.name }, function(err, cssref) {
            if (err) res.send(err);
            cssref.name = req.body.name;
            cssref.save(function(err) {
                if (err) {
                    res.send(err);
                }
                res.json(sanitize(cssref));
            });
        });
    })
    .delete(function(req, res) {
        CssRef.remove({ name: req.params.name }, function(err, cssref) {
            if (err) res.send(err);
            res.sendStatus(204);
        });
    });

/**
 * Handling 404 errors
 */
router.get('*', function(req, res, next) {
    var err = new Error();
    err.status = 404;
    err.message = 'Requested URL not found';
    next(err);
});
router.use(function(err, req, res, next) {
    if (err.status !== 404) {
        return next();
    }
    res.status(err.status).send(err);
});
