import React, { ChangeEvent, useState } from "react";
import '../signup.css';

const FirstSignUp = () => {
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
    const apiUrl = 'https://example.com/api/endpoint'; // Replace with your API endpoint

    const postData = {
      email:details.useremail,
      masterPassword:details.userpassword
      // Add more key-value pairs as needed
    };

    const requestOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        // You may need to include additional headers like authorization tokens here
      },
      body: JSON.stringify(postData),
    };


  };

  return (
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
  );
};

export default FirstSignUp;
