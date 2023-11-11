const express = require('express');
// const cors = require('cors');
const router = require('./src/Router/BaseRouter');
const dotenv = require('dotenv');
const line = require('@line/bot-sdk');
const path = require('path');
dotenv.config();

const app = express();
const PORT = 3000;

const config = {
    channelAccessToken: process.env.CHANNEL_ACCESS_TOKEN,
    channelSecret: process.env.CHANNEL_SECRET,
};

const client = new line.Client(config);
app.use(express.urlencoded({ extended: false }));

app.use(express.json());

app.use('/api/v1',router)

  
app.listen(PORT, (error) =>{
    if(!error)
        console.log("Server is Successfully Running, and App is listening on port "+ PORT)
    else 
        console.log("Error occurred, server can't start", error);
    }
);
