import { useState } from 'react';
import '../list.css'
import PasswordMenu from './PasswordMenu';
interface PasswordType {
  name: string;
  password: string;
  _id: string; // Assuming _id is a string, adjust accordingly
}

interface PropType {
  passwords: PasswordType[]|undefined;
  mail:string
}


const PasswordList = ({ passwords,mail }: PropType) => {
  const[createPassword,setCreatePassword]  = useState<boolean>(false);
  console.log(passwords);


  if(createPassword===true){
    return(
      <PasswordMenu passwordName='' passwordValue='' mail={mail} />
    )
  }
  return(
    <>
    <h3>Previous Passwords</h3>
    <div className='list-container'>

    {passwords?.map((item)=>{
      return(
            <p>
            <span className="password-text">Name:{item.name}</span>
            <br />
            <span className="password-text">Password:{item.password}</span>
            <br />
           
            <span className='pasword-options'>
            <button onClick={()=>{
              navigator.clipboard.writeText(item.password).then(()=>{
                alert("copied to clipboard");
              })
            }}>copy</button>
            <button>edit</button>

            </span>
            </p>
        )
      })}

      <button className='create-password-btn' onClick={()=>{
        setCreatePassword(true);
      }}>+</button>
      </div>
    </>
  )
};

export default PasswordList;
