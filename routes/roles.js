'use strict';
var express = require('express');
var router = express.Router();

var RolesData = require("../models/roles");

var getRolesFilter = function (query) {

    var result = {
        RoleName: new RegExp(query.RoleName, "i")
    };
    // if (query.IsActive) {
    //     result.IsActive = query.IsActive === 'true' ? true : false;
    // }
    if (query.IsActive && query.IsActive !== '-1') {
        result.IsActive = query.IsActive === '1' ? true : false;
    }
    if (query.Permission && query.Permission !== '0') {
        result.Permission = parseInt(query.Permission, 10);
    }
    return result;

};

var prepareItem = function (source) {
    var result = source;
    //result.IsActive = source.IsActive === 'true' ? true : false;

    result.IsActive = source.IsActive === '1' ? true : false;
    result.Permission = parseInt(source.Permission, 10);
    return result;
};

router.get('/data', function (req, res, next) {
    RolesData.find(getRolesFilter(req.query), function (err, items) {
        res.json(items);
    });

    // var perPage = 10;
    // var page = req.params.page || 1;

    // RolesData
    //     .find(getRolesFilter(req.query))
    //     .skip((perPage * page) - perPage)
    //     .limit(perPage)
    //     .exec(function (err, items) {
    //         RolesData.count().exec(function (err, count) {
    //             if (err) return next(err)
    //             res.json(items);
    //         });
    //     });

});

router.get('/data:page', function (req, res, next) {

    var perPage = 10;
    var page = req.params.page || 1;

    RolesData
        .find(getRolesFilter(req.query))
        .skip((perPage * page) - perPage)
        .limit(perPage)
        .exec(function (err, items) {
            RolesData.count().exec(function (err, count) {
                if (err) return next(err)
                res.json(items);
            });
        });

});

router.post('/data', function (req, res, next) {
    var item = prepareItem(req.body);
    var myData = new RolesData(item);
    myData.save(function (err, role) {
        if (err) { throw err; }
        res.json(role);
    });
});

router.put('/data', function (req, res, next) {
    var item = prepareItem(req.body);
    RolesData.update({ _id: item._id }, item, {}, function (err) {
        res.json(item);
    });
});

router.delete('/data', function (req, res, next) {
    var item = prepareItem(req.body);
    RolesData.findByIdAndRemove({ _id: item._id }, function (err, role) {
        console.log("This object will get deleted " + role);
        if (err) {
            throw err;
        } else {
            res.json(item);
        }
    });
});


module.exports = router;
