const { mutipleMongooseObject } = require('../../util/mongoose');
const { MongooseObject } = require('../../util/mongoose');
const { render } = require('node-sass');
const fs = require('fs');
const product = require('../modules/products.module');
const shop = require('../modules/shops.module');
class SiteController {
    //[get]

    openImage(req, res) {

        const imageName = "uploads/" + req.query.image_name;
        fs.readFile(imageName, (err, imageData) => {
            if (err) {
                res.json({
                    result: "failed",
                    message: `cannot read image. Error is:${err}`,
                });
            }
            // res.writeHead(200, { 'Content-Type': 'image/jpeg' });
            res.end(imageData);
        })
    }

}
module.exports = new SiteController();