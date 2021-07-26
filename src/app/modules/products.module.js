const productSchema = require('../schema/Product');


class productModule {

    // addShopToProduct = function(productId, shop) {
    //     return productSchema.findByIdAndUpdate(
    //         productId, { $push: { shops: shop._id } }, { new: true, useFindAndModify: false }
    //     );
    // };
    setProduct(data, thumbnails) {
        return new Promise((resolve, reject) => {
            data.thumbnails = thumbnails;
            var product = new productSchema(data);
            product.save().then(data => {
                return resolve(data);
            }).catch(err => {
                return reject(err);
            })
        })
    }

    get(id) {
        return new Promise((resolve, reject) => {
            productSchema.findOne({ "_id": id })
                .then(data => {
                    return resolve(data)
                }).catch(err => {
                    return reject(err)
                })
        })
    }

    getsession(data) {
        return new Promise((resolve, reject) => {
            productSchema.find({ "session": data }).limit(20).then(data => {
                return resolve(data)
            }).catch(err => {
                return reject(err)
            })
        })
    }
    gettype(type) {
        return new Promise((resolve, reject) => {
            productSchema.find({ "type": type }).limit(20).then(data => {
                return resolve(data)
            }).catch(err => {
                return reject(err)
            })
        })
    }
    getidshop(data) {
        return new Promise((resolve, reject) => {
            productSchema.find({ "shopID": data }).then(data => {
                return resolve(data)
            }).catch(err => {
                return reject(err)
            })
        })
    }
    get20() {
        return new Promise((resolve, reject) => {
            productSchema.find().limit(20).then(data => {
                return resolve(data)
            }).catch(err => {
                return reject(err)
            })
        })
    }
    getsort20() {
        return new Promise((resolve, reject) => {
            productSchema.find().limit(20).then(data => {
                return resolve(data.sort())
            }).catch(err => {
                return reject(err)
            })
        })
    }
    gets() {
        return new Promise((resolve, reject) => {
            productSchema.find().then(data => {
                return resolve(data)
            }).catch(err => {
                return reject(err)
            })
        })
    }
    update(id, data, thumbnails) {
        return new Promise((resolve, reject) => {
            data.thumbnails = thumbnails;
            productSchema.updateOne({ "_id": id }, data)
                .then(data => {
                    return resolve(data)
                }).catch(err => {
                    return reject(err)
                })
        })
    }
    searchs(data) {
        return new Promise((resolve, reject) => {
            const name = data.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
            const reg = new RegExp(name, 'ig');

            productSchema.find({
                    $or: [
                        { name: reg },
                        { typedetail: reg },
                    ]
                })
                .then(data => {
                    return resolve(data)
                })
                .catch(err => {
                    return reject(err)
                })
        })
    }
    searchByType(data) {
        return new Promise((resolve, reject) => {
            const name = data.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
            const reg = new RegExp(name, 'ig');

            productSchema.find({
                    $or: [
                        { typedetail: reg },
                    ]
                })
                .then(data => {
                    return resolve(data)
                })
                .catch(err => {
                    return reject(err)
                })
        })
    }

    // function updateProduct(id, name, price, promotion, sizes, status, product_type_id, gender, description, thumbnail, producer_id, discount) {
    //     return new Promise((resolve, reject) => {
    //         productSchema.findOneAndUpdate({ _id: id }, {
    //             name: name,
    //             price: price,
    //             promotion: promotion,
    //             sizes: sizes,
    //             status: status,
    //             product_type_id: product_type_id,
    //             gender: gender,
    //             description: description,
    //             thumbnail: thumbnail,
    //             discount: discount,
    //             producer_id: producer_id

    //         }).then(data => {
    //             return resolve(data)
    //         }).catch(err => {
    //             return reject(err)
    //         })
    //     })
    // }

    deleteProduct(id) {
        return new Promise((resolve, reject) => {
            productSchema.deleteOne({ _id: id }).then(data => {
                return resolve(data);
            }).catch(err => {
                return reject(err);
            })
        })
    }

    // function getProductsByIdProductType(idProductType) {
    //     return new Promise((resolve, reject) => {
    //         productSchema.find({ product_type_id: idProductType }).then(products => {
    //             resolve(products);
    //         }).catch(err => {
    //             reject(err);
    //         });
    //     });
    // }

    // function getProductsByIdProducer(idProducer) {
    //     return new Promise((resolve, reject) => {
    //         productSchema.find({ producer_id: idProducer }).then(products => {
    //             resolve(products);
    //         }).catch(err => {
    //             reject(err);
    //         });
    //     });
    // }

    // function deleteAnThumbnail(idProduct, thumbnail) {
    //     return new Promise((resolve, reject) => {
    //         productSchema.update({ _id: idProduct }, { $pullAll: { thumbnail: [thumbnail] } }).then(data => {
    //             resolve(data);
    //         }).catch(err => {
    //             reject(err);
    //         });
    //     });
    // }

    // function getNewProduct(number) {
    //     return new Promise((resolve, reject) => {
    //         productSchema.find().sort({ date_create: -1 }).limit(number).then(data => {
    //             resolve(data);
    //         }).catch(err => {
    //             reject(err);
    //         });
    //     });
    // }

    // function getProductAsc(number) {
    //     return new Promise((resolve, reject) => {
    //         productSchema.find().sort({ price: -1 }).limit(number).then(data => {
    //             resolve(data);
    //         }).catch(err => {
    //             reject(err);
    //         });
    //     })
    // }

    // function getProductDesc(number) {
    //     return Promise((resolve, reject) => {
    //         productSchema.find().sort({ price: 1 }).limit(number).then(data => {
    //             resolve(data);
    //         }).catch(err => {
    //             reject(err);
    //         })
    //     })
    // }

    // function getProductByFilterNumber(price) {
    //     return new Promise((resolve, reject) => {
    //         productSchema.find()
    //             .populate("producer_id", ["name"], "producers")
    //             .populate("product_type_id", ["name"], "product_types")
    //             .where('price').lt(price).then(products => {
    //                 resolve(products);
    //             }).catch(err => {
    //                 reject(err);
    //             })
    //     });
    // }

    // function deleteAllProductByIdProducer(idProducer) {
    //     return new Promise((resolve, reject) => {
    //         productSchema.deleteMany({ producer_id: idProducer }).then(data => {
    //             return resolve(data);
    //         }).catch(err => {
    //             return reject(err);
    //         })
    //     })
    // }

    // function deleteAllProductByIdProductType(idProductType) {
    //     return new Promise((resolve, reject) => {
    //         productSchema.deleteMany({ product_type_id: idProductType }).then(data => {
    //             return resolve(data);
    //         }).catch(err => {
    //             return reject(err);
    //         })
    //     })
    // }

    // function getNewProductGender(gender, number) {
    //     return new Promise((resolve, reject) => {
    //         productSchema.find({ gender: gender }).sort({ date_create: -1 }).limit(number).then(data => {
    //             resolve(data);
    //         }).catch(err => {
    //             reject(err);
    //         });
    //     });
    // }

    // function isValidNumItem(id, numItem) {
    //     return new Promise((resolve, reject) => {
    //         productSchema.findOne({ _id: id }).then(result => {
    //             if (parseInt(result.numItem) >= parseInt(numItem)) {
    //                 resolve({ "isValid": true, "validNumber": result.numItem });
    //             } else {
    //                 resolve({ "isValid": false, "validNumber": result.numItem });
    //             }
    //         }).catch(err => {
    //             reject(err);
    //         })
    //     });
    // }

    // function getProductHaveValidNumItem() {
    //     return new Promise((resolve, reject) => {
    //         productSchema.find()
    //             .where("numItem")
    //             .gt(0)
    //             .then(products => {
    //                 resolve(products);
    //             }).catch(err => {
    //                 reject(err);
    //             })
    //     });
    // }

    // function getProductHaveUnValidNumItem() {
    //     return new Promise((resolve, reject) => {
    //         productSchema.find()
    //             .where("numItem")
    //             .eq(0)
    //             .then(products => {
    //                 resolve(products);
    //             }).catch(err => {
    //                 reject(err);
    //             })
    //     });
    // }

    // function findProduct(str) {
    //     return new Promise((resolve, reject) => {
    //         productSchema.find({ $text: { $search: str } })
    //             .limit(9)
    //             .then(products => {
    //                 resolve(products)
    //             }).catch(err => {
    //                 reject(err);
    //             })
    //     })
    // }

    getProductByName(name) {
        return new Promise((resolve, reject) => {
            productSchema.findOne({ name: name })
                .then(product => {
                    resolve(product)
                }).catch(err => {
                    reject(err);
                })
        })
    }

    // function productContainInWareHouse() {
    //     return new Promise((resolve, reject) => {
    //         productSchema.aggregate([{
    //             $group: {
    //                 _id: null,
    //                 total: { $sum: "$numItem" }
    //             }
    //         }]).then(result => {
    //             resolve(result);
    //         }).catch(err => {
    //             reject(err);
    //         })

    //     });
    // }

    // function updateItemProduct(id, item) {
    //     return new Promise((resolve, reject) => {
    //         productSchema.findById({ _id: id }).then(data => {
    //             productSchema.findOneAndUpdate({ _id: id }, { numItem: data.numItem - item }).then(productUpdate => {
    //                 resolve(productUpdate);
    //             }).catch(err => {
    //                 reject(err);
    //             })
    //         }).catch(err => {
    //             reject(err);
    //         })
    //     })
    // }

    // function increaseNumLike(idProduct) {
    //     return new Promise((resolve, reject) => {
    //         productSchema.findOneAndUpdate({ _id: idProduct }, { $inc: { numLike: 1 } }).then(productUpdate => {
    //             resolve(productUpdate);
    //         }).catch(err => {
    //             reject(err);
    //         })
    //     })
    // }

    // function decreaseNumLike(idProduct) {
    //     return new Promise((resolve, reject) => {
    //         productSchema.findOneAndUpdate({ _id: idProduct }, { $inc: { numLike: -1 } }).then(productUpdate => {
    //             resolve(productUpdate);
    //         }).catch(err => {
    //             reject(err);
    //         })
    //     })
    // }
}
module.exports = new productModule();