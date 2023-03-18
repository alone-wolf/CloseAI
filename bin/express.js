const express = require('express');
const http = require('http');

const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');

function setup() {
    const routers = {
        Users: require("../routers/User").register
    }

    const app = express();
    app.use(cors());
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));
    routers.Users(app)

    let p = path.join(__dirname, '../public')
    console.log(p);
    app.use("/", express.static(p));

    const server = http.createServer(app);
    return { server, app }
}



module.exports = { setup }
