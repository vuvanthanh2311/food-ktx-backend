const user = require('../modules/users.module');
const userSchema = require('../schema/Users');
// const Bill = require('../modules/Bill');
const { mutipleMongooseObject } = require('../../util/mongoose');
const { MongooseObject } = require('../../util/mongoose');
const { render } = require('node-sass');


class userController {
    addUser(data) {
        // hàm xử lý tìm kiếm
        return new Promise((resolve, reject) => {
            user.setUser(data)
                .then(data => {
                    return resolve(data);
                }).catch(err => {
                    return reject(err);
                })
        })

    }
    FindUser(data) {
        // hàm xử lý tìm kiếm
        return new Promise((resolve, reject) => {
            user.find(data)
                .then(data => {
                    return resolve(data);
                }).catch(err => {
                    return reject(err);
                })
        })

    }
    getUsers() {
        return new Promise((resolve, reject) => {
            user.gets().then(data => {
                return resolve(data);
            }).catch(err => {
                return reject(err);
            })
        })
    }
    userCookie(data, user) {
        return new Promise((resolve, reject) => {
            const token = jwt.sign({ _id: data._id }, process.env.TOKEN_SECRET);
            //lưu lên cookie ( xác nhận user chính xác)
            res.cookie("token", token, {
                httpOnly: false,
            });
            if (data.admin) {

                const tokenadmin = jwt.sign({ admin: data.admin }, process.env.TOKEN_SECRET);
                //lưu lên cookie  ( xác nhận là tài khoản admin)
                res.cookie("tokenadmin", tokenadmin, {
                    httpOnly: false,
                });

            }
        })
    }



    // xử lý đăng xuất
    logout(req, res, next) {

        const token = req.cookies.token;
        res.clearCookie("token");
        res.clearCookie("tokenadmin")
        res.redirect("/")

    }
}
module.exports = new userController();