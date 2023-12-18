# bitkoth
cross platform password manager with cloud sync, no ios support (cuz poverty)

### Extension Demo: https://youtu.be/C4WJR8SFbVE
## How to setup chrome-extension locally:

- First, clone the repo
    -  ```git clone https://github.com/apoorvapendse/bitkoth```
- Now install the dependencies in the chrome-extension folder
    - ```cd ./bitkoth/chrome-extension && pnpm i```
- Now make the dist folder using the following command:
    - ```pnpm run build```

- Go to chrome extensions icon and click on manage extensions 
![image](https://github.com/apoorvapendse/bitkoth/assets/102853901/6c9fd287-bc98-4f20-8c0d-64fff1517628)

- Enable developer mode
  ![image](https://github.com/apoorvapendse/bitkoth/assets/102853901/c8a86b7d-0395-41e6-9c5b-aabb1274552a)

- Load unpacked, and select the dist folder in bitkoth/chrome-extension
![image](https://github.com/apoorvapendse/bitkoth/assets/102853901/686abfa3-1c52-4059-92c8-9093bf597988)

- This will add the extension and you can pin it and use it to safely store and retrieve your passwords!
