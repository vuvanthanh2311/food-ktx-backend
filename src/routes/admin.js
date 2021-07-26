const express = require('express');
const fs = require('fs');
const formidable = require('formidable');
const router = express.Router();
const { mutipleMongooseObject } = require('../util/mongoose');
const { MongooseObject } = require('../util/mongoose');
const productController = require('../app/controllers/productControllers');
const shopController = require('../app/controllers/shopControllers');
const userController = require('../app/controllers/userControllers');






// xu ly event cua cac san pham
router.get('/add-product', function(req, res, next) {
    res.render('admin/add-product')
});


router.post('/add-product', function(req, res, next) {
    const form = new formidable.IncomingForm();
    form.uploadDir = "./uploads";
    form.keepExtensions = true;
    form.maxFieldsSize = 10 * 1024 * 1024;
    form.multiples = true;

    form.parse(req, (err, fields, files) => {
        if (err) {
            res.json({
                result: "failed",
                data: {},
                message: `cannot upload image. Error is: ${err}`
            });
        }
        console.log(fields, files.thumbnails)
        productController.createProduct(fields, files.thumbnails)
            .then(newProduct => {
                console.log(newProduct)

                res.redirect("/admin/list-product");

            }).catch(err => {
                res.send(err);
            })
    });

});
router.post('/search', function(req, res, next) {
    const data = req.body;
    console.log(data.search)
    productController.searchProducts(data.search)
        .then((data) => {
            res.json(data);
        })
        .catch(err => {
            res.send(err);
        })
})

router.get('/list-product', function(req, res, next) {
    productController.getProducts()
        .then((data) => {
            res.render('admin/listProduct', {
                products: mutipleMongooseObject(data),
            })
        }).catch(err => {
            res.send(err);
        })

});

router.get('/update-product/:id', function(req, res, next) {
    productController.getProduct(req.params.id)
        .then((data) => {
            res.render('admin/updateProduct', {
                product: MongooseObject(data)
            })
        })
        .catch(err => {
            res.send(err);
        })
})

router.put('/update-product/:id', function(req, res, next) {
    // cài đặt thông số image
    const form = new formidable.IncomingForm();
    form.uploadDir = "./uploads";
    form.keepExtensions = true;
    form.maxFieldsSize = 10 * 1024 * 1024;
    form.multiples = true;
    // trả về dữ liệu fields: nhứng trường khác , file: image
    form.parse(req, (err, fields, files) => {
        if (err) {
            res.json({
                result: "failed",
                data: {},
                message: `cannot upload image. Error is: ${err}`
            });
        }
        productController.updateProduct(req.params.id, fields, files.thumbnails)
            .then((data) => {
                res.redirect('/admin/list-product')
            })
            .catch(err => {
                res.send(err);
            })
    });

})

router.delete('/delete/:id', function(req, res, next) {
    productController.deleteProduct(req.params.id)
        .then((data) => {
            res.redirect('back')
        })
        .catch(err => {
            res.send(err);
        })
})


// xu ly event cua cac cua hang
router.get('/add-shop', function(req, res, next) {
    res.render('admin/add-shop')
});

router.post('/add-shop', function(req, res, next) {
    const form = new formidable.IncomingForm();
    form.uploadDir = "./uploads";
    form.keepExtensions = true;
    form.maxFieldsSize = 10 * 1024 * 1024;
    form.multiples = true;

    form.parse(req, (err, fields, files) => {
        if (err) {
            res.json({
                result: "failed",
                data: {},
                message: `cannot upload image. Error is: ${err}`
            });
        }
        console.log(fields, files.thumbnails)
        shopController.createShop(fields, files.thumbnails)
            .then(newShop => {
                console.log(newShop)
                if (newShop.status == "shop đã tồn tại") {
                    res.redirect("/admin/add-shop");
                } else {
                    res.redirect("/admin/list-shop");
                }
            }).catch(err => {
                res.send(err);
            })
    });

});

router.get('/list-shop', function(req, res, next) {
    shopController.getShops()
        .then((data) => {
            res.render('admin/listShop', {
                shops: mutipleMongooseObject(data),
            })
        }).catch(err => {
            res.send(err);
        })

});

router.post('/shop/search', function(req, res, next) {
    const data = req.body;
    console.log(data.search)
    shopController.searchShops(data.search)
        .then((data) => {
            res.json(data);
        })
        .catch(err => {
            res.send(err);
        })
})

router.get('/update-shop/:id', function(req, res, next) {

    shopController.getShop(req.params.id)
        .then((data) => {
            res.render('admin/updateShop', {
                shop: MongooseObject(data)
            })
        })
        .catch(err => {
            res.send(err);
        })
})

router.put('/update-shop/:id', function(req, res, next) {
        // cài đặt thông số image
        const form = new formidable.IncomingForm();
        form.uploadDir = "./uploads";
        form.keepExtensions = true;
        form.maxFieldsSize = 10 * 1024 * 1024;
        form.multiples = true;
        // trả về dữ liệu fields: nhứng trường khác , file: image
        form.parse(req, (err, fields, files) => {
            if (err) {
                res.json({
                    result: "failed",
                    data: {},
                    message: `cannot upload image. Error is: ${err}`
                });
            }

            shopController.updateShop(req.params.id, fields, files.thumbnails)
                .then((data) => {
                    res.redirect('/admin/list-shop')
                })
                .catch(err => {
                    res.send(err);
                })
        });

    })
    // router.put('/update-shop/:id', function(req, res, next) {
    //     shopController.updateShop(req.params.id, req.body)
    //         .then((data) => {
    //             res.redirect('/admin/list-shop')
    //         })
    //         .catch(err => {
    //             res.send(err);
    //         })


// })

router.delete('/delete-shop/:id', function(req, res, next) {
    shopController.deleteShop(req.params.id)
        .then((data) => {
            res.redirect('back')
        })
        .catch(err => {
            res.send(err);
        })
})

// USER
router.get('/list-user', function(req, res, next) {
    userController.getUsers()
        .then((data) => {
            res.render('admin/listUser', {
                users: mutipleMongooseObject(data),
            })
        }).catch(err => {
            res.send(err);
        })

});


router.get('/', function(req, res) {
    res.render('admin/dashboard')
});

module.exports = router;