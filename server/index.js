"use strict";
let express = require('express');
let app = express();
const cors = require('cors')
const bodyParser = require('body-parser')

async function start() {
    app.use(bodyParser.json());
    app.use(express.json());
    app.use(cors());
    app.use('/', require('./routes'));
    app.use((req, res, next) => {
        res.header('Access-Control-Allow-Origin', '*')
        res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method')
        res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE')
        res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE')

        next()
    })
    let server = app.listen(8080, function () {
        console.log('Express server listening on port ' + server.address().port);
    });
}
start()
exports = module.exports = app;
module.exports.start = start;
