'use strict';
var express = require('express');
var router = express.Router();

var vendorData = require("../models/vendor");

var getvendorFilter = function (query) {  
    var result = {
        VendorName: new RegExp(query.VendorName, "i")
    };
    if (query.ProductType && query.ProductType !== 'sand') {
        result.ProductType = parseInt(query.ProductType, 10);
    }
   
    if (query.Status) {
        result.Status = query.Status === 'true' ? true : false;
    }
    
   
    return result;

};

var prepareItem = function (source) {       
    var result = source;     
    result.VendorName = source.VendorName; 
     result.ProductType = source.ProductType; 
    result.Status = source.Status === 'true' ? true : false;
     
    
    return result;
};

router.get('/data', function (req, res, next) {            
    vendorData.find(getvendorFilter(req.query), function (err, items) {
        res.json(items);
    });
});

router.post('/data', function (req, res, next) {     
    var item = prepareItem(req.body);
    var myData = new vendorData(item); 
    myData.save(function (err, vendor) {
        if (err) { throw err; }
        res.json(vendor);
    });
});

router.put('/data', function (req, res, next) {
    var item = prepareItem(req.body);

    vendorData.update({ _id: item._id }, item, {}, function (err) {
        res.json(item);
    });
});

router.delete('/data', function (req, res, next) {
    var item = prepareItem(req.body);
    vendorData.findByIdAndRemove({ _id: item._id }, function (err, vendor) {
        console.log("This object will get deleted " + vendor);
        if (err) {
            throw err;
        } else {
            res.json(item);
        }
    });
});


module.exports = router;
