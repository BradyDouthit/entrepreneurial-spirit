const proxy = require('http-proxy-middleware');

module.exports = function (app) {
    app.use(proxy('/api/stocks', { target: 'http://localhost:8080' }));
};