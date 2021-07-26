const express = require('express');
const router = express.Router();
const siteController = require('../app/controllers/SiteController');
const productController = require('../app/controllers/productControllers');
const shopController = require('../app/controllers/shopControllers');

router.get("/open_image", siteController.openImage)
    //shop

router.get('/shop/getshops', function(req, res, next) {
    shopController.getShops()
        .then((data) => {
            res.json(data)
        })
        .catch((err) => {
            res.send(err);
        })
});
router.get('/shop/getshop20', function(req, res, next) {
    shopController.getShop20()
        .then((data) => {
            res.json(data)
        })
        .catch((err) => {
            res.send(err);
        })
});
router.get('/shop/getshop/:id', function(req, res, next) {
    shopController.getShop(req.params.id)
        .then((data) => {
            res.json(data)
        })
        .catch((err) => {
            res.send(err);
        })
});
router.get('/shop/getproduct/:id', function(req, res, next) {
    productController.getProductByIdShop(req.params.id)
        .then((data) => {
            res.json(data)
        })
        .catch((err) => {
            res.send(err);
        })
});
router.get('/shop/type/:slug', function(req, res, next) {
    shopController.getShopByType(req.params.slug)
        .then((data) => {
            res.json(data)
        })
        .catch((err) => {
            res.send(err);
        })
});
router.get('/shop/zone/:slug', function(req, res, next) {
    shopController.getShopByZone(req.params.slug)
        .then((data) => {
            res.json(data)
        })
        .catch((err) => {
            res.send(err);
        })
});
//product
router.get('/product/getproduct20', function(req, res, next) {
    productController.getProduct20()
        .then((products) => {
            var promises = products.map(function(item) {
                return shopController.getShop(item.shopID)
                    .then((shop) => {
                        var data = {}
                        data.product = item;
                        data.shop = shop;
                        return data;
                    })
            });
            Promise.all(promises).then(function(results) {
                res.json(results)
            })

        })
        .catch((err) => {
            res.send(err);
        })
});
router.get('/product/getPriceEnd20', function(req, res, next) {
    productController.getPriceEnd20()
        .then((products) => {
            var promises = products.map(function(item) {
                return shopController.getShop(item.shopID)
                    .then((shop) => {
                        var data = {}
                        data.product = item;
                        data.shop = shop;
                        return data;
                    })
            });
            Promise.all(promises).then(function(results) {
                res.json(results)
            })

        })
        .catch((err) => {
            res.send(err);
        })
});
router.get('/product/session/:slug', function(req, res, next) {
    productController.getProductBySession(req.params.slug)
        .then((products) => {
            var promises = products.map(function(item) {
                return shopController.getShop(item.shopID)
                    .then((shop) => {
                        var data = {}
                        data.product = item;
                        data.shop = shop;
                        return data;
                    })
            });
            Promise.all(promises).then(function(results) {
                res.json(results)
            })
        })
        .catch((err) => {
            res.send(err);
        })
});
router.get('/product/type/:slug', function(req, res, next) {
    productController.getProductByType(req.params.slug)
        .then((products) => {
            var promises = products.map(function(item) {
                return shopController.getShop(item.shopID)
                    .then((shop) => {
                        var data = {}
                        data.product = item;
                        data.shop = shop;
                        return data;
                    })
            });
            Promise.all(promises).then(function(results) {
                res.json(results)
            })
        })
        .catch((err) => {
            res.send(err);
        })
});
router.get('/product/:id', function(req, res, next) {
    productController.getProduct(req.params.id)
        .then((product) => {
            shopController.getShop(product.shopID)
                .then((shop) => {
                    var data = {}
                    data.product = product;
                    data.shop = shop;
                    res.json(data);
                })
        })

    .catch((err) => {
        res.send(err);
    })
});
router.get('/product/offer/:slug', function(req, res, next) {
    productController.searchProductsByType(req.params.slug)
        .then((products) => {
            var promises = products.map(function(item) {
                return shopController.getShop(item.shopID)
                    .then((shop) => {
                        var data = {}
                        data.product = item;
                        data.shop = shop;
                        return data;
                    })
            });
            Promise.all(promises).then(function(results) {
                res.json(results)
            })

        })
        .catch((err) => {
            res.send(err);
        })
});
module.exports = router;