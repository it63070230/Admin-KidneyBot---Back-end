
const express = require('express');
const { router } = require('./Router/BaseRouter');
  
const app = express();
const PORT = 3000;

// app.get('/', (req, res)=>{
//     res.status(200);
//     res.send("Welcome to root URL of Servers");
// });

app.use(router)
  
app.listen(PORT, (error) =>{
    if(!error)
        console.log("Server is Successfully Running, and App is listening on port "+ PORT)
    else 
        console.log("Error occurred, server can't start", error);
    }
);