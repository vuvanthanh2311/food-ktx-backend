const userSchema = require('../schema/Users');


class userModule {

    setUser(data) {
        return new Promise((resolve, reject) => {
            var user = new userSchema(data);
            user.save().then(data => {
                return resolve(data);
            }).catch(err => {
                return reject(err);
            })
        })
    }
    find(data) {
        return new Promise((resolve, reject) => {

            userSchema.findOne({ "email": data }).then(data => {

                return resolve(data);
            }).catch(err => {
                return reject(err);
            })
        })
    }
    gets() {
        return new Promise((resolve, reject) => {
            userSchema.find().then(data => {
                return resolve(data)
            }).catch(err => {
                return reject(err)
            })
        })
    }
}
module.exports = new userModule();