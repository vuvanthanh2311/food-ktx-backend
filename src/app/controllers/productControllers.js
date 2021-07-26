const product = require('../modules/products.module');
// const User = require('../modules/Users');
// const Bill = require('../modules/Bill');
const { mutipleMongooseObject } = require('../../util/mongoose');
const { MongooseObject } = require('../../util/mongoose');
const { render } = require('node-sass');


class productController {
    getSpecific(length) {
        var result = '';
        var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        var charactersLength = characters.length;
        for (var i = 0; i < length; i++) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
        return result;
    }
    searchProducts(data) {
        // hàm xử lý tìm kiếm
        return new Promise((resolve, reject) => {
            product.searchs(data)
                .then(data => {
                    return resolve(data);
                }).catch(err => {
                    return reject(err);
                })
        })

    }
    searchProductsByType(data) {
            // hàm xử lý tìm kiếm
            return new Promise((resolve, reject) => {
                product.searchByType(data)
                    .then(data => {
                        return resolve(data);
                    }).catch(err => {
                        return reject(err);
                    })
            })

        }
        // getProductsByIdProductType(idProductType) {
        //     return new Promise((resolve, reject) => {
        //         product.getProductsByIdProductType(idProductType).then(products => {
        //             resolve(products);
        //         }).catch(err => {
        //             reject(err);
        //         });
        //     });

    // }

    // getProductsByIdProducer(idProducer) {
    //     return new Promise((resolve, reject) => {
    //         product.getProductsByIdProducer(idProducer).then(products => {
    //             resolve(products);
    //         }).catch(err => {
    //             reject(err);
    //         });
    //     });
    // }

    createProduct(data, thumbnails) {
        return new Promise((resolve, reject) => {
            var fileNames = [];
            if (thumbnails.length > 0) {
                thumbnails.forEach((item) => {
                    fileNames.push(item.path.slice(8));
                })
            }
            product.getProductByName(data.name).then(exist => {
                if (exist != null) {
                    resolve({ status: "sản phẩm đã tồn tại" });
                } else {

                    product.setProduct(data, fileNames)
                        .then(newProduct => {
                            return resolve(newProduct);
                        }).catch(err => {
                            return reject(err);
                        })

                }
            }).catch(err => {
                reject(err);
            })
        })


    }


    getProducts() {
        return new Promise((resolve, reject) => {
            product.gets().then(data => {
                return resolve(data);
            }).catch(err => {
                return reject(err);
            })
        })
    }
    getProductBySession(data) {
        return new Promise((resolve, reject) => {
            product.getsession(data).then(data => {
                return resolve(data);
            }).catch(err => {
                return reject(err);
            })
        })
    }
    getProductByType(type) {
        return new Promise((resolve, reject) => {
            product.gettype(type).then(data => {
                return resolve(data);
            }).catch(err => {
                return reject(err);
            })
        })
    }
    getProductByIdShop(data) {
        return new Promise((resolve, reject) => {
            product.getidshop(data).then(data => {
                return resolve(data);
            }).catch(err => {
                return reject(err);
            })
        })
    }
    getProduct20() {
        return new Promise((resolve, reject) => {
            product.get20().then(data => {
                return resolve(data);
            }).catch(err => {
                return reject(err);
            })
        })
    }


    getPriceEnd20() {
        return new Promise((resolve, reject) => {
            product.getsort20().then(data => {
                return resolve(data);
            }).catch(err => {
                return reject(err);
            })
        })
    }
    getProduct(id) {
        return new Promise((resolve, reject) => {
            product.get(id).then(data => {
                return resolve(data);
            }).catch(err => {
                return reject(err);
            })
        })
    }

    updateProduct(id, data, thumbnails) {
        return new Promise((resolve, reject) => {
            var fileNames = [];
            if (thumbnails.length > 0) {
                thumbnails.forEach((item) => {
                    fileNames.push(item.path.slice(8));
                })
            }

            product.update(id, data, fileNames)
                .then(data => {
                    return resolve(data);
                }).catch(err => {
                    return reject(err);
                })

        })

    }

    deleteProduct(id) {
        return new Promise((resolve, reject) => {
            product.deleteProduct(id).then(data => {
                return resolve(data);
            }).catch(err => {
                return reject(err);
            })
        })
    }

    // updateProduct(data, files) {
    //     console.log(files);
    //     var file = files;


    //     console.log(file);
    //     var array_name = Array();
    //     console.log(file);
    //     if (file !== null) {
    //         var file = file.thumbnail;
    //         if (typeof file.length === "undefined") {
    //             array_name.push(getSpecific(20) + file.name);
    //         } else {
    //             for (let i = 0; i < file.length; i++) {
    //                 var new_file_name = getSpecific(20) + file[i].name;
    //                 array_name.push(new_file_name);
    //             }
    //         }
    //     }

    //     var str = data.sizes.replace(new RegExp(" ", "g"), '');
    //     var sizes = str.split(",");

    //     return new Promise((resolve, reject) => {
    //         product.get(data.id).then(oldProduct => {
    //             product.updateProduct(
    //                 data.id,
    //                 data.name,
    //                 data.price,
    //                 data.promotion,
    //                 sizes,
    //                 data.status,
    //                 data.product_type_id,
    //                 data.gender,
    //                 data.description, [...oldProduct.thumbnail, ...array_name],
    //                 data.producer_id,
    //                 data.discount,
    //             ).then(newProduct => {
    //                 if (array_name.length > 0) {
    //                     if (array_name.length === 1) {
    //                         file.mv(path.join(__dirname, '../public/upload/product_thumbnails/' + array_name[0]), function(err) {
    //                             if (err) {
    //                                 console.log(err);
    //                             } else {
    //                                 console.log("success");
    //                             }
    //                         });
    //                     } else {
    //                         for (let i = 0; i < file.length; i++) {
    //                             file[i].mv(path.join(__dirname, '../public/upload/product_thumbnails/' + array_name[i]), function(err) {
    //                                 if (err) {
    //                                     console.log(err);
    //                                 } else {
    //                                     console.log("success");
    //                                 }
    //                             });
    //                         }
    //                     }
    //                 }

    //                 return resolve(newProduct);
    //             }).catch(err => {
    //                 return reject(err);
    //             });
    //         }).catch(err => {
    //             console.log(err);
    //         })

    //     });





    // }

    // deleteAnThumbnail(idProduct, thumbnail) {
    //     return new Promise((resolve, reject) => {
    //         product.deleteAnThumbnail(idProduct, thumbnail).then(deleted => {
    //             fs.unlink(path.join(__dirname, '../public/upload/product_thumbnails/') + thumbnail, (err) => {
    //                 if (err) {
    //                     reject(err);
    //                 } else {
    //                     resolve(deleted);
    //                 }
    //             });
    //         }).catch(err => {
    //             reject(err);
    //         })
    //     });
    // }

    // getNewProduct(number) {
    //     return new Promise((resolve, reject) => {
    //         product.getNewProduct(number).then(data => {
    //             return resolve(data);
    //         }).catch(err => {
    //             return reject(err);
    //         });
    //     });
    // }

    // getProductAsc(number) {
    //     return Promise((resolve, reject) => {
    //         product.getProductAsc(number).then(data => {
    //             resolve(data);
    //         }).catch(err => {
    //             reject(err);
    //         });
    //     });
    // }

    // getProductDesc(number) {
    //     return Promise((resolve, reject) => {
    //         product.getProductDesc(number).then(data => {
    //             resolve(data);
    //         }).catch(err => {
    //             reject(err);
    //         });
    //     })
    // }

    // getProductByFilterNumber(price) {
    //     return new Promise((resolve, reject) => {
    //         product.getProductByFilterNumber(price).then(products => {
    //             resolve(products);
    //         }).catch(err => {
    //             reject(err);
    //         })
    //     })
    // }

    // getNewProductGender(gender, number) {
    //     return new Promise((resolve, reject) => {
    //         product.getNewProductGender(gender, number).then(data => {
    //             return resolve(data);
    //         }).catch(err => {
    //             return reject(err);
    //         });
    //     });
    // }

    // isValidNumItem(data) {
    //     return new Promise((resolve, reject) => {
    //         product.isValidNumItem(data.id, data.numItem).then(result => {
    //             return resolve(result);
    //         }).catch(err => {
    //             return reject(err);
    //         });
    //     });
    // }

    // getProductHaveValidNumItem() {
    //     return new Promise((resolve, reject) => {
    //         product.getProductHaveValidNumItem().then(products => {
    //             return resolve(products);
    //         }).catch(err => {
    //             return reject(err);
    //         });
    //     });
    // }

    // getProductHaveUnValidNumItem() {
    //     return new Promise((resolve, reject) => {
    //         product.getProductHaveUnValidNumItem().then(products => {
    //             return resolve(products);
    //         }).catch(err => {
    //             return reject(err);
    //         });
    //     });
    // }

    // findProduct(str) {
    //     return new Promise((resolve, reject) => {
    //         product.findProduct(str)
    //             .then(products => {
    //                 resolve(products)
    //             }).catch(err => {
    //                 reject(err);
    //             })
    //     })
    // }

    // productContainInWareHouse() {
    //     return new Promise((resolve, reject) => {
    //         product.productContainInWareHouse().then(result => {
    //             resolve(result)
    //         }).catch(err => {
    //             reject(err);
    //         });
    //     })
    // }
    // updateItemProduct(productUpdate) {
    //     return new Promise((resolve, reject) => {
    //         product.updateItemProduct(productUpdate.product_id, productUpdate.numItem).then(data => {
    //             resolve(data);
    //         }).catch(err => {
    //             reject(err);
    //         })
    //     })
    // }

    // updateItemProducts(data) {
    //     return new Promise((resolve, reject) => {
    //         let array = [];
    //         for (let i = 0; i < data.length; i++) {
    //             array.push(updateItemProduct(data[i]));
    //         }
    //         Promise.all(array).then(values => {
    //             resolve(values);
    //         }).catch(err => {
    //             reject(err);
    //         })
    //     })
    // }

}
module.exports = new productController();