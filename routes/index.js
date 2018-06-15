'use strict';
var express = require('express');
var router = express.Router();
var session = require("express-session");
router.use(session({ secret: "XASDASDA" }));

/* GET default page. */
router.get('/', function (req, res) {
	res.render('index', { title: 'test' });
});

/* GET home page. */
router.get('/home', function (req, res) {
	res.render('admin/dashboard', { title: 'Admin Dashboard' });
});

/* GET user page. */
router.get('/user', function (req, res) {
	res.render('admin/user/listuser', { title: 'Admin Users List' });
});

/* GET roles page. */
router.get('/roles', function (req, res) {
	res.render('admin/roles', { title: 'Roles & Permission' });
});
/* GET roles page. */
router.get('/product', function (req, res) {
	res.render('admin/product/listproduct', { title: 'product list' });
});
/* GET product page. */
router.get('/trucktype', function (req, res) {
	res.render('admin/trucktypes', { title: 'Admin truck list' });
});
/* GET product page. */
router.get('/vendor', function (req, res) {
	res.render('admin/vendors/listvendor', { title: 'Admin vendor list' });
});
/* GET product page. */
router.get('/fuelsurcharges', function (req, res) {
	res.render('admin/fuelsurcharges/listfuel', { title: 'Admin fuelsurcharges list' });
});
module.exports = router;
