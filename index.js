const express = require('express');
const cors = require('cors');
const router = require('./src/Router/BaseRouter');
const dotenv = require('dotenv');
dotenv.config();

const app = express();
const PORT = 3000;


app.use(express.json());

const corsOptions = {
  origin: ['https://kidney-bot-project.web.app', 'http://localhost:3001'],
  credentials: true,
};

app.use(cors(corsOptions));

app.get('/', (req, res)=>{
    res.status(200);
    res.send("Welcome to root URL of Servers");
});

app.use('/api/v1',router)

  
app.listen(PORT, (error) =>{
    if(!error)
        console.log("Server is Successfully Running, and App is listening on port "+ PORT)
    else 
        console.log("Error occurred, server can't start", error);
    }
);