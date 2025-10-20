import express from 'express';
import connection from './connection.js'
import Router from './router.js';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config(); //loads environmental variables from .env file
const app = express();
// const port = 3000;

app.use(express.json());
app.use(cors());
app.use('/api', Router);
connection().then(()=>{
    app.listen(process.env.PORT, ()=>{
        console.log(`Server is running on http://localhost:${process.env.PORT}`);
        
    })
}).catch((error)=>{
    console.log(error);
    
})