import express from 'express';
import { router } from './router/router.js';
import { connectDB } from './database/db.js';



const app = express();
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
  });

app.use(express.json());

app.use(express.urlencoded({extended:true}))

app.use("/",router);

const PORT = 4000;
connectDB().then(()=>{

    app.listen(PORT,(req,res)=>{
        console.log("server is running on port : ",PORT);
    })
})
