import express from 'express';
import { router } from './router/router.js';



const app = express();

app.use(express.json());

app.use(express.urlencoded({extended:true}))

app.use("/",router);

const PORT = 4000;
app.listen(PORT,(req,res)=>{
    console.log("server is running on port : ",PORT);
})
