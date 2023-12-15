import { useEffect, useState } from 'react'
import '../menu.css'

interface PropType {
    passwordName: string,
    passwordValue: string,
    mail: string,
    setCreatePassword:React.Dispatch<React.SetStateAction<boolean>>
    setEditPassword:React.Dispatch<React.SetStateAction<{
        passwordName: string;
        passwordValue: string;
        arrayIndex: number;
    }>>
    arrayIndex:Number
}


const PasswordMenu = ({ passwordName, passwordValue,mail,setCreatePassword,arrayIndex,setEditPassword }: PropType) => {

    const [passwordLength, setPasswordLength] = useState(8);
    const [passName, setPassName] = useState(passwordName);
    const [passVal, setPassVal] = useState(passwordValue);

    const [includeNumbers, setIncludeNumbers] = useState(false);
    const [includeSpecialChars, setIncludeSpecialChars] = useState(false);
    useEffect(() => {

        let passString = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ"
        if (includeNumbers) {
            passString += "123456789"
        }
        if (includeSpecialChars) {
            passString += "!@#$%^&*()-_=+[{]};:',<.>/?`~\|";
        }


        let newPassword = "";
        for (let i = 0; i < passwordLength; i++) {
            let randomIndex = Math.floor(Math.random() * passString.length);
            let randomChar = passString[randomIndex];
            newPassword += randomChar;
        }
        setPassVal(newPassword);
        // this useEffect will run whenever a password parameter changes namely
        // length, useSpecialChars and useNumbers
    }, [passwordLength, includeNumbers, includeSpecialChars])


    async function addPassword(){
        
        const apiUrl = "https://bitkoth.onrender.com/api/add-password"
        const postData = {
            email:mail,
            passwordValue:passVal,
            passwordName:passName,
        }

    const requestOptions = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(postData),
      };
      const response = await fetch(apiUrl, requestOptions)
      if(response.status===200){
        alert("password was added successfully!!!")
        setCreatePassword(false);
      }
    }

    async function editPassword(){
        
        const apiUrl = "https://bitkoth.onrender.com/api/edit-password"
        const postData = {
            email:mail,
            passwordValue:passVal,
            passwordName:passName,
            arrayIndex:arrayIndex
        }

    const requestOptions = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(postData),
      };
      const response = await fetch(apiUrl, requestOptions)
      if(response.status===200){
        alert("password was edited successfully!!!")
        setEditPassword({passwordName:"",passwordValue:"",arrayIndex:-1});
      }
    }
    async function handleSubmit(e:React.FormEvent){
        e.preventDefault();
        if(arrayIndex===-1){
            await addPassword();
        }
        else{
            await editPassword();
        }

    }

    return (
        <div className="container">
            <form onSubmit={handleSubmit}>

                <div className="group">
                    <input type="text" required value={passName} onChange={(e) => setPassName(e.target.value)} />
                    <span className="highlight"></span>
                    <span className="bar"></span>
                    <label>Service Name/URL</label>
                </div>

                <div className="group">
                    <input type="text" value={passVal} required onChange={(e) => setPassVal(e.target.value)} />
                    <span className="highlight"></span>
                    <span className="bar"></span>
                    <label>Password</label>
                </div>

                <input type="range" defaultValue={passwordLength} min={8} max={32} onChange={(e) => setPasswordLength(Number(e.target.value))} />
                <span style={{ fontSize: "large" }}>Length:{passwordLength}</span>
                <br />

                {/* Checkboxes for special chars and numbers */}


                <span>Include Numbers:</span><input type="checkbox" defaultChecked={false} id='numcheckbox'
                    onChange={(e) => setIncludeNumbers(e.target.checked)}
                />


                <br />
                <span>Include Special Chars:</span><input type="checkbox" defaultChecked={false} id='specialCharCheckbox'
                    onChange={(e) => setIncludeSpecialChars(e.target.checked)}
                />
                <br />
                <button >Save</button>

            </form>
        </div>
    )
}

export default PasswordMenu