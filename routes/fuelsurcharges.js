'use strict';
var express = require('express');
var router = express.Router();

var fuelsurchargesData = require("../models/fuelsurcharges");

var getfuelsurchargesFilter = function (query) {
    var result = {
        FromPrice: new RegExp(query.FromPrice, "i")
    };
    if (query.ToPrice && query.ToPrice !== '0') {
        result.ToPrice = parseInt(query.ToPrice, 10);
    }
    if (query.FuelSurcharge && query.FuelSurcharge !=='0') {
        result.FuelSurcharge = parseInt(query.FuelSurcharge, 10);
    }
    if (query.Status) {
        result.Status = query.Status === 'true' ? true : false;
    }
    
   
    return result;

};

var prepareItem = function (source) {  
    
    var result = source;       
    result.FromPrice = parseInt(source.FromPrice, 10); 
    result.ToPrice = parseInt(source.ToPrice, 10); 
    result.FuelSurcharge = parseInt(source.FuelSurcharge, 10); 
    result.Status = source.Status === 'true' ? true : false;
     
    
    return result;
};

router.get('/data', function (req, res, next) {   
    FuelSurchargeData.find(getFuelSurchargeFilter(req.query), function (err, items) {
        res.json(items);
    });
});

router.post('/data', function (req, res, next) { 
      
    var item = prepareItem(req.body);
    var myData = new fuelsurchargesData(item); 
    myData.save(function (err, fuelsurchargesData) {
        if (err) { throw err; }
        res.json(fuelsurchargesData);
    });
});

router.put('/data', function (req, res, next) {
    var item = prepareItem(req.body);
    fuelsurchargesData.update({ _id: item._id }, item, {}, function (err) {
        res.json(item);
    });
});

router.delete('/data', function (req, res, next) {
    var item = prepareItem(req.body);
    fuelsurchargesData.findByIdAndRemove({ _id: item._id }, function (err, fuelsurcharges) {
        console.log("This object will get deleted " + fuelsurcharges);
        if (err) {
            throw err;
        } else {
            res.json(item);
        }
    });
});


module.exports = router;
