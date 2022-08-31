const express = require('express');
require('dotenv').config()

const mongoose = require('mongoose');
const app = express()
app.use(express.json());
require('./database/connect')

const emailRoute = require("./Routes/mailerRoute")
app.use('/',emailRoute)
app.listen(5000 , console.log("app working in port 5000"))