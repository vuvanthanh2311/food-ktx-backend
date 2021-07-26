const express = require('express');
const fs = require('fs');
const formidable = require('formidable');
const router = express.Router();
const { mutipleMongooseObject } = require('../util/mongoose');
const { MongooseObject } = require('../util/mongoose');
const productController = require('../app/controllers/productControllers');
const shopController = require('../app/controllers/shopControllers');
const userController = require('../app/controllers/userControllers');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser')

dotenv.config()


router.post('/signup', function(req, res, next) {
    const data = req.body;
    userController.addUser(data)
        .then((data) => {
            res.json(data);
        })
        .catch(err => {
            res.send(err);
        })
})
router.post('/login', function(req, res, next) {
    const user = req.body;

    userController.FindUser(user.email)
        .then((data) => {

            if (!data) {

                res.json('email not found');
            }

            if (data.password === user.password) {

                res.json(data)

            } else {
                res.json('pass not exacli')

            }

        })
        .catch(err => {
            res.send(err);
        })
})



module.exports = router;