var express     = require('express'),
    bodyParser  = require('body-parser'),
    mongoose    = require('mongoose'),
    CssRef      = require('../models/cssref');

var router = express.Router();
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
            res.json(cssref);
        });
    })
    .get(function(req, res) {
        CssRef.find(function(err, cssrefs) {
            if (err) {
                res.send(err);
            }
            res.json(cssrefs);
        })
    });

router.route('/css/:ref_id')
    .get(function(req, res) {
        CssRef.findById(req.params.ref_id, function(err, cssref) {
            if (err) {
                if (cssref == null || cssref == 'undefined') {
                    res.status(404).send({status: 404, message: 'not found' });
                } else {
                    res.send(err);
                }
            }
            res.json(cssref);
        });
    })
    .put(function(req, res) {
        CssRef.findById(req.params.ref_id, function(err, cssref) {
            if (err) {
                res.send(err);
            }
            cssref.name = req.body.name;
            cssref.save(function(err) {
                if (err) {
                    res.send(err);
                }
                res.json(cssref);
            });
        });
    })
    .delete(function(req, res) {
        CssRef.remove({
            _id: req.params.ref_id
        }, function(err, cssref) {
            if (err) {
                res.send(err);
            }
            res.sendStatus(204);
        });
    });

