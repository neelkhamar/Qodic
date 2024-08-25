require('dotenv').config()

const express = require("express");
const cors = require("cors");
const app = express();
const authModule = require('./routes/auth');
const starWarModule = require('./routes/starWar');
const verifyToken = require('./middleware/authMiddleware');
const redis = require("./utils/redis");
const bodyParser = require("body-parser");

app.use(cors({
    "origin": "*",
    "methods": "GET,HEAD,PUT,PATCH,POST,DELETE"
}))

// support parsing of application/json type post data
app.use(bodyParser.json());

//support parsing of application/x-www-form-urlencoded post data
app.use(bodyParser.urlencoded({ extended: true }));

const db = require('./utils/db');

app.use('/api/auth', authModule);
app.use('/api/star-war', verifyToken, starWarModule);

app.get('/api/test', (req, res) => {
    res.json({ success: true, message: "Server is healthy" });
})

app.listen(process.env.PORT, () => {
    console.log("Server is up and runnning")
    db.initialiseConnection();
    redis.initialiseCache();
})