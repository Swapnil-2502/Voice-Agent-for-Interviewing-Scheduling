const express = require("express")
const app = express();
const dotenv = require('dotenv');
const cors = require("cors")

dotenv.config();

app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5001

const jobroutes = require('./routes/Jobroutes')

app.use('/api/jobs',jobroutes)



app.get("/",(req,res)=>{
    res.send("Hello from Home page")
})

app.listen(PORT,()=>{
    console.log(`Server running on PORT ${PORT}`)
})
