import express from 'express';
import dotenv from 'dotenv';
import router from './router.js'
import cors from 'cors'
import connection from './connection.js';
dotenv.config()
const app=express();
app.use(cors())
app.use(express.static('frondend'));
app.use(express.json({limit:"20mb"}));
app.use("/BookMyShow",router);
connection().then(()=>{
    app.listen(process.env.PORT,()=>{
        console.log("server started");
    })
}).catch((error)=>{
    console.log(error);
})