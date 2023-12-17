import express from 'express';
import { router } from './router/router.js';
import { connectDB } from './database/db.js';

// encryptionModule.js

import fs from 'fs';
import NodeRSA from 'node-rsa';

const publicKeyFilePath = 'publicKey.pem';
const privateKeyFilePath = 'privateKey.pem';

let encryptionKey;

// Check if keys already exist
if (fs.existsSync(publicKeyFilePath) && fs.existsSync(privateKeyFilePath)) {
  // Keys exist, so load them
  const storedPublicKeyPem = fs.readFileSync(publicKeyFilePath, 'utf-8');
  const storedPrivateKeyPem = fs.readFileSync(privateKeyFilePath, 'utf-8');

  encryptionKey = new NodeRSA();
  encryptionKey.importKey(storedPublicKeyPem, 'pkcs1-public-pem');
  encryptionKey.importKey(storedPrivateKeyPem, 'pkcs1-private-pem');
} else {
  // Keys don't exist, so generate new keys
  encryptionKey = new NodeRSA({ b: 512 });

  // Export public and private keys as PEM strings
  const publicKeyPem = encryptionKey.exportKey('pkcs1-public-pem');
  const privateKeyPem = encryptionKey.exportKey('pkcs1-private-pem');

  // Store publicKeyPem and privateKeyPem in separate files
  fs.writeFileSync(publicKeyFilePath, publicKeyPem, 'utf-8');
  fs.writeFileSync(privateKeyFilePath, privateKeyPem, 'utf-8');
}

export { encryptionKey };



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
