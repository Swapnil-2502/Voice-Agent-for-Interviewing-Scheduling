const express = require("express")
const app = express();
const dotenv = require('dotenv');

dotenv.config();

const PORT = process.env.PORT || 5001

app.get("/",(req,res)=>{
    res.send("Hello from Home page")
})

app.listen(PORT,()=>{
    console.log(`Server running on PORT ${PORT}`)
})
