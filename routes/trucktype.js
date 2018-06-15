'use strict';
var express = require('express');
var router = express.Router();

var TruckTypeData = require("../models/trucktype");

var getTruckTypeFilter = function (query) {
    var result = {
        TruckType: new RegExp(query.TruckType, "i")
    };
    if (query.Capacity && query.Capacity !== '0') {
        result.Capacity = parseInt(query.Capacity, 10);
    }
    if (query.Units && query.Units !=='0') {
        result.Units = parseInt(query.Units, 10);
    }
    if (query.Status) {
        result.Status = query.Status === 'true' ? true : false;
    }
    
   
    return result;

};

var prepareItem = function (source) {   
    var result = source;       
    result.Units = parseInt(source.Units, 10); 
    result.Capacity = parseInt(source.Capacity, 10); 
    result.Status = source.Status === 'true' ? true : false;
     
    
    return result;
};

router.get('/data', function (req, res, next) {   
    TruckTypeData.find(getTruckTypeFilter(req.query), function (err, items) {
        res.json(items);
    });
});

router.post('/data', function (req, res, next) {     
    var item = prepareItem(req.body);
    var myData = new TruckTypeData(item); 
    myData.save(function (err, TruckType) {
        if (err) { throw err; }
        res.json(TruckType);
    });
});

router.put('/data', function (req, res, next) {
    var item = prepareItem(req.body);

    TruckTypeData.update({ _id: item._id }, item, {}, function (err) {
        res.json(item);
    });
});

router.delete('/data', function (req, res, next) {
    var item = prepareItem(req.body);
    TruckTypeData.findByIdAndRemove({ _id: item._id }, function (err, TruckType) {
        console.log("This object will get deleted " + TruckType);
        if (err) {
            throw err;
        } else {
            res.json(item);
        }
    });
});


module.exports = router;
