import { useState } from 'react'
import '../menu.css'

interface PropType{
    passwordName:string,
    passwordValue:string,
    mail:string
}


const PasswordMenu = ({}:PropType) => {

    const[passwordLength,setPasswordLength] = useState(8);

  return (
    <div className="container">
        <form>
    
    <div className="group">      
      <input type="text" required/>
      <span className="highlight"></span>
      <span className="bar"></span>
      <label>Service Name/URL</label>
    </div>
      
    <div className="group">      
      <input type="text" required/>
      <span className="highlight"></span>
      <span className="bar"></span>
      <label>Password</label>
    </div>

    <input type="range" min={8} max={32} onChange={(e)=>setPasswordLength(Number(e.target.value))}/>

    <button>Save</button>
    
  </form>
    </div>
  )
}

export default PasswordMenu