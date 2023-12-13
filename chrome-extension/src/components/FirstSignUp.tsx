import React, { ChangeEvent, useState } from "react";
import '../signup.css';


interface PropType{
  setLoggedIn: React.Dispatch<React.SetStateAction<boolean>>
}

const FirstSignUp = ({setLoggedIn}:PropType) => {
  const [details, setDetails] = useState({
    useremail: "",
    userpassword: ""
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setDetails((prevDetails) => ({
      ...prevDetails,
      [e.target.name]: e.target.value,
    }));
  };

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
        </>
  );
};

export default FirstSignUp;
