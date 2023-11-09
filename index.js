const express = require('express');
// const cors = require('cors');
const router = require('./src/Router/BaseRouter');
const dotenv = require('dotenv');
dotenv.config();

const app = express();
const PORT = 3000;

//richmenu section
const path = require('path');
// const cookieParser = require('cookie-parser');
// const logger = require('morgan');
const line = require('@line/bot-sdk');
// const cors = require('cors');

const config = {
    channelAccessToken: process.env.CHANNEL_ACCESS_TOKEN,
    channelSecret: process.env.CHANNEL_SECRET,
};

const client = new line.Client(config);
// app.use(logger('dev'));
app.use(express.urlencoded({ extended: false }));
// app.use(cookieParser());
// app.use(cors());
//richmenu section

app.use(express.json());

// // Configure CORS to allow requests from a specific origin
// const corsOptions = {
//   origin: 'https://kidney-bot-project.web.app',
//   credentials: true,
// };

// app.use(cors(corsOptions));

app.get('/', (req, res)=>{
    res.status(200);
    res.send("Welcome to Change richmenu");
});
// app.get('/api/v1/unlink-richmenu', (req, res) => {    
//     client.unlinkRichMenuFromUser("U74f5c0564a76037c2a6be68779119176");
//     res.json({
//         data: req.body
//     });
// });

app.post('/api/v1/change-richmenu', (req, res) => {
    // save data in db
    const { firstname, lastname, email, userId } = req.body;
    client.linkRichMenuToUser(userId, "richmenu-2623d73aeee7f55a786bc7469924aef9");
    res.json({
        data: req.body
    });
})

app.use('/api/v1',router)

  
app.listen(PORT, (error) =>{
    if(!error)
        console.log("Server is Successfully Running, and App is listening on port "+ PORT)
    else 
        console.log("Error occurred, server can't start", error);
    }
);
