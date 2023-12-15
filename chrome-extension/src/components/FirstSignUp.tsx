import React, { ChangeEvent, useState } from "react";
import '../signup.css';
import Login from "./Login";


interface PropType{
  setLoggedIn: React.Dispatch<React.SetStateAction<boolean>>
}

const FirstSignUp = ({setLoggedIn}:PropType) => {
  const [details, setDetails] = useState({
    useremail: "",
    userpassword: ""
  });
  const [goToLoginPage,setGoToLoginPage] = useState(false);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setDetails((prevDetails) => ({
      ...prevDetails,
      [e.target.name]: e.target.value,
    }));
  };

  async function checkAccount(mail:string){
    const result = await fetch(`https://bitkoth.onrender.com/api/check-presence?mail=${mail}`);
    console.log(result);
    if(result.status===200){
      localStorage.setItem("bitkothmail",`${mail}`)
      return(
        <Login mail={mail}/>
      )
    }
    else{
      alert("mail does not exist in database, please create account")
    }
  }
  const submitHandler = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log(details.useremail, details.userpassword);
    const apiUrl = 'https://bitkoth.onrender.com/api/add-user';

    const postData = {
      email:details.useremail,
      masterPassword:details.userpassword
    };

    const requestOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(postData),
    };

    
    const result = await fetch(apiUrl,requestOptions);
    //on successful login 
    if(result.status===200){
      console.log("account created successfully!!!!!!!");
      localStorage.setItem("bitkothmail",`${details.useremail}`)
      setLoggedIn(true);
    }
    else{
      alert("Account already exists");
    }
  };

  if(goToLoginPage===true){
      const mail = prompt("Enter email to login");
      if(mail){ 
        checkAccount(mail);
      }else{
        alert("cannot use null value for email")
      }
    
  }
  return (
    <>
    <h1>bitkoth</h1>
    <form onSubmit={submitHandler}>
      <input
        type="email"
        name="useremail"
        placeholder="enter email"
        onChange={handleChange}
        required
        />
      <br />
      <input
        type="password"
        name="userpassword"
        placeholder="set password"
        onChange={handleChange}
        required
        />
      <br />
      <button type="submit">Create Account</button>
    </form>
    <br />
    <button onClick={()=>setGoToLoginPage(true)}>Go To Login</button>
        </>
  );
};

export default FirstSignUp;
