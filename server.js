const express=require('express');
const router = require('./routes/contactRoutes');
const userrouter = require("./routes/userRoutes");
const errorHandler=require('./middleware/errorHandler');
const connectDb = require('./config/dbconnection');
const dotenv=require('dotenv').config();
connectDb();
const app=express();
const port=process.env.PORT
app.use(express.json())
app.use('/api/contacts',router)
app.use("/api/users", userrouter);
app.use(errorHandler)
app.listen(port,()=>{
    console.log(`server running at port ${port}`);
})
