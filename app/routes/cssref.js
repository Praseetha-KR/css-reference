var express         = require('express'),
    bodyParser      = require('body-parser'),
    mongoose        = require('mongoose'),
    CssRef          = require('../models/cssref'),
    router          = express.Router(),
    cleanResponse   = require('../utils/cleanResponse');

module.exports = router;

router.use(function(req, res, next) {
    console.log(req.method + ' ' +
        req.baseUrl + req.url + ' ' +
        res.statusCode + ' ' +
        req.headers.host + ' ' +
        req.headers['user-agent']
    );
    next();
});

router.get('/', function(req, res) {
    res.json({ message: 'Welcome to CSS Reference API' });
});

router.route('/css')
    .post(function(req, res) {
        var cssref = new CssRef();
        cssref.name = req.body.name;

        cssref.save(function(err) {
            if (err) {
                res.send(err);
            }
            res.json(cleanResponse(cssref));
        });
    })
    .get(function(req, res) {
        CssRef.find(function(err, cssrefs) {
            if (err) {
                res.send(err);
            }
            cssrefs = cssrefs.map(function(obj) {
                return cleanResponse(obj)
            });
            res.json(cssrefs);
        })
    });

router.route('/css/:name')
    .get(function(req, res) {
        CssRef.findOne({
            name: req.params.name
        }, function(err, cssref) {
            if (err) {
                res.send(err);
            }
            res.json(cleanResponse(cssref));
        });
    })
    .put(function(req, res) {
        CssRef.findOne({
            name: req.params.name
        }, function(err, cssref) {
            if (err) {
                res.send(err);
            }
            cssref.name = req.body.name;
            cssref.save(function(err) {
                if (err) {
                    res.send(err);
                }
                res.json(cleanResponse(cssref));
            });
        });
    })
    .delete(function(req, res) {
        CssRef.remove({
            name: req.params.name
        }, function(err, cssref) {
            if (err) {
                res.send(err);
            }
            res.sendStatus(204);
        });
    });

