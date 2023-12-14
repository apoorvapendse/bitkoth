import { useEffect, useState } from 'react'
import '../menu.css'

interface PropType {
    passwordName: string,
    passwordValue: string,
    mail: string
}


const PasswordMenu = ({ passwordName, passwordValue }: PropType) => {

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
    return (
        <div className="container">
            <form>

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
                <button>Save</button>

            </form>
        </div>
    )
}

export default PasswordMenu