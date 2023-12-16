
import React, { useState } from 'react'
import '../signup.css'
import PasswordList from './PasswordList';
interface Proptype {
  mail: string
}
interface PasswordType {
  name: string;
  password: string;
  _id: string; // Assuming _id is a string, adjust accordingly
}

const Login = ({ mail }: Proptype) => {

  const [masterPassword, setMasterPassword] = useState("");
  const [hasAccess, setHasAccess] = useState(false);
  const [passwords, setPasswords] = useState<PasswordType[]>();

  async function submitHandler(e: React.FormEvent) {
    e.preventDefault();
    console.log("Entered password:", masterPassword);

    const apiUrl = 'https://bitkoth.onrender.com/api/get-all-passwords';

    const postData = {
      email: mail,
      masterPassword: masterPassword,
    };

    const requestOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(postData),
    };


    const response = await fetch(apiUrl, requestOptions);
    if (response.status === 200) {
      const list = await response.json();
      const passwords = list.passwords;
      setHasAccess(true);
      setPasswords(passwords);
  

    }
    else {
      alert("invalid password!!!!");
    }


  }

  if (hasAccess === false) {

    return (
      <>
        <h3>Hello {mail}</h3>
        <form onSubmit={submitHandler}>
          <input type="password" placeholder="Enter Master Password" onChange={(e) => setMasterPassword(e.target.value)} />
          <br />
          <button type='submit'>Submit</button>
        </form>
          <button onClick={()=>{
            localStorage.removeItem("bitkothmail")
            window.location.reload()
          }}
          style={{
            marginTop:"5px"
          }}
          >Logout</button>
      </>
    )
  }
  else{
    return(
      
      <PasswordList passwords={passwords} mail={mail} masterPassword={masterPassword}/>
    )
  }
}

export default Login