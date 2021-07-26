const site = require('./sites');
const admin = require('./admin');
const user = require('./user');


function route(app) {
    app.use('/user', user);
    app.use('/admin', admin);
    app.use('/', site);

}
module.exports = route;