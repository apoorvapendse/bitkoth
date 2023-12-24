# bitkoth

Note: The backend is hosted on free tier of Render, and does take time to spin up if not in use already, sorry for the inconvenience
### Extension Link: https://chromewebstore.google.com/detail/mcifhdaaijhfjlehkihmmpbfpfhmgneh?hl=en
### Extension Demo: https://youtu.be/C4WJR8SFbVE

## Intro
Introducing BitKoth, a powerful Chrome extension designed to elevate your online security through an innovative password management…

Introducing BitKoth, a powerful Chrome extension designed to elevate your online security through an innovative password management system. BitKoth employs a unique approach, utilizing a common RSA key to encrypt and decrypt stored passwords, all while ensuring the highest standards of protection for your sensitive data.

Upon registration, users are prompted to establish a master password—an essential component for securing access to their encrypted credentials. This master password serves as the gateway for subsequent logins, offering an additional layer of security to safeguard your digital identity.

BitKoth employs the bcrypt hashing algorithm to secure the master password. The resulting hash is stored in a MongoDB Atlas cluster, providing a robust defense against unauthorized access. This ensures that your master password remains cryptographically protected, even in the face of potential security threats.

What sets BitKoth apart is its use of a common RSA key for encrypting and decrypting passwords. Each password is individually encrypted using this shared key, bolstering security without sacrificing user convenience. This approach ensures that all passwords are protected by a uniform layer of encryption, making it challenging for unauthorized entities to compromise the stored data.

When authorized clients request access to stored passwords, BitKoth's server validates their identity by decrypting the master password hash using the bcrypt algorithm. Upon successful verification, the common RSA key is utilized to decrypt the passwords from the database. This streamlined process guarantees secure and efficient access to your sensitive information while maintaining the integrity of the encryption.

BitKoth is the epitome of user-friendly yet robust password management. By employing a common RSA key, it offers a seamless and secure solution to protect your passwords. Elevate your online security with BitKoth—a Chrome extension that prioritizes both user convenience and the highest standards of data protection in today's ever-evolving digital landscape.

## How to setup chrome-extension locally:



- First, clone the repo
    -  ```git clone https://github.com/apoorvapendse/bitkoth```
- Now install the dependencies in the chrome-extension folder
    - ```cd ./bitkoth/chrome-extension && pnpm i```
- Now make the dist folder using the following command:
    - ```pnpm run build```
      
- For self hosted db and backend ***(optional)*** 
    - Go to the backend directory and run ```pnpm i```
    - Create a .env file and add the variables
     - ```MONGO_URI``` of you atlas cluster or local mongodb server
     - Also add a ```PORT``` variable to determine the port to run the backend server on 


### How to add the chrome extension locally after running the build command
- Go to chrome extensions icon and click on manage extensions 

![image](https://github.com/apoorvapendse/bitkoth/assets/102853901/6c9fd287-bc98-4f20-8c0d-64fff1517628)

- Enable developer mode
  ![image](https://github.com/apoorvapendse/bitkoth/assets/102853901/c8a86b7d-0395-41e6-9c5b-aabb1274552a)

- Load unpacked, and select the dist folder in bitkoth/chrome-extension
![image](https://github.com/apoorvapendse/bitkoth/assets/102853901/686abfa3-1c52-4059-92c8-9093bf597988)

- This will add the extension and you can pin it and use it to safely store and retrieve your passwords!
