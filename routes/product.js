'use strict';
var express = require('express');
var router = express.Router();

var ProductData = require("../models/Product");

var getProductFilter = function (query) {  
    var result = {
        ProductName: new RegExp(query.ProductName, "i")
    };
    if (query.ProductType && query.ProductType !== 'sand') {
        result.ProductType = parseInt(query.ProductType, 10);
    }
    if (query.Units && query.Units !=='0') {
        result.Units = parseInt(query.Units, 10);
    }
    if (query.IsActive && query.IsActive !== '-1') {
        result.IsActive = query.IsActive === '1' ? true : false;
    
    
    }
    
   
    return result;

};

var prepareItem = function (source) {   
    var result = source;       
    result.Units = parseInt(source.Units, 10); 
    result.ProductName = source.ProductName; 
     result.ProductType = source.ProductType; 
    result.Status = source.Status === '1' ? true : false;
     
    
    return result;
};

router.get('/data', function (req, res, next) {       
    ProductData.find(getProductFilter(req.query), function (err, items) {
        res.json(items);
    });
});

router.post('/data', function (req, res, next) {     
    var item = prepareItem(req.body);
    var myData = new ProductData(item); 
    myData.save(function (err, Product) {
        if (err) { throw err; }
        res.json(Product);
    });
});

router.put('/data', function (req, res, next) {
    var item = prepareItem(req.body);

    ProductData.update({ _id: item._id }, item, {}, function (err) {
        res.json(item);
    });
});

router.delete('/data', function (req, res, next) {
    var item = prepareItem(req.body);
    ProductData.findByIdAndRemove({ _id: item._id }, function (err, Product) {
        console.log("This object will get deleted " + Product);
        if (err) {
            throw err;
        } else {
            res.json(item);
        }
    });
});


module.exports = router;
