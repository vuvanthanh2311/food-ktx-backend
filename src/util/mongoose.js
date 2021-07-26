module.exports = {
    mutipleMongooseObject: function (mongoose) {
        return mongoose.map(mongoose => mongoose.toObject());
    },
    MongooseObject: function (mongoose) {
        return mongoose ? mongoose.toObject() : mongoose;
    },
};

