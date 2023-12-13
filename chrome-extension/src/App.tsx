
import { useEffect, useState } from 'react'
import './App.css'
import FirstSignUp from './components/FirstSignUp'
import Login from './components/Login';

function App() {
  
const [loggedIn,setLoggedIn] = useState<boolean>(false);
const [mail,setMail] = useState("")
useEffect(()=>{
    console.log(loggedIn);
    const isAlreadyLoggedIn = localStorage.getItem("bitkothmail");
    

    if(isAlreadyLoggedIn!==null){
      setLoggedIn(true);
      setMail(isAlreadyLoggedIn)
      console.log("logged in user found with mail:",mail);
    }
},[loggedIn])


if(loggedIn===false){
  return(
    <FirstSignUp setLoggedIn={setLoggedIn}/>
  )
}

else{
  return(
    <Login mail={mail}/>
  )
}
      

  
}

export default App
