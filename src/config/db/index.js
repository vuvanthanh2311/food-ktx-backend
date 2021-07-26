const mongoose = require('mongoose');

async function connect() {
    try {
        await mongoose.connect(
            'mongodb+srv://vuvanthanh:vuvanthanh2311@cluster0.gsrkt.mongodb.net/WebDoAn', {
                useNewUrlParser: true,
                useUnifiedTopology: true,
                useFindAndModify: false,
                useCreateIndex: true,
            },
        );
        console.log('connect succesfully!');
    } catch (error) {
        console.log('connect falure!');
    }
}
module.exports = { connect };