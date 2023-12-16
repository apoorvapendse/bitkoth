import { useEffect, useState } from 'react';
import '../list.css'
import PasswordMenu from './PasswordMenu';
interface PasswordType {
  name: string;
  password: string;
  _id: string; // Assuming _id is a string, adjust accordingly
}

interface PropType {
  passwords: PasswordType[]|undefined;
  mail:string,
  masterPassword:string
}


const PasswordList = ({ passwords,mail,masterPassword }: PropType) => {
  const[createPassword,setCreatePassword]  = useState<boolean>(false);
  const[editPassword,setEditPassword]  = useState({
    passwordName:"",
    passwordValue:"",
    arrayIndex:-1
  });
  
  const [pwds,setPwds] = useState(passwords);
  console.log(passwords);

  async function fetchPasswords(){
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
      
      setPwds(passwords);
  

    }
    else {
      alert("invalid password!!!!");
    }

  }

  useEffect(()=>{
    fetchPasswords();
  },[createPassword,editPassword])

  if(createPassword===true){
    return(
      <PasswordMenu passwordName='' passwordValue='' mail={mail} setCreatePassword={setCreatePassword} arrayIndex={-1}
      setEditPassword={setEditPassword} />
    )
  }
  if(editPassword.arrayIndex!==-1){
    return(
      <PasswordMenu 
      passwordName={editPassword.passwordName}
      passwordValue={editPassword.passwordValue}
      mail={mail}
      setCreatePassword={setCreatePassword}
      setEditPassword={setEditPassword}
      arrayIndex={editPassword.arrayIndex}/>
    )
  }
  return(
    <>
    <h3>Previous Passwords</h3>
    <div className='list-container'>

    {pwds?.map((item,index)=>{
      return(
            <p>
            <span className="password-text">{item.name}</span>
            <br />
            <span className="password-text nodisplay" 
              id={`${index}`}
            >{item.password}</span>
            <br />
           
            <span className='pasword-options'>
            {/* show button */}
            <button
              onClick={()=>{

                const ele = document.getElementById(`${index}`);
                console.log(ele);
                ele?.classList.toggle("nodisplay")
              }}
            >Show</button>


              {/* copy button */}
            <button onClick={()=>{
              navigator.clipboard.writeText(item.password).then(()=>{
                alert("copied to clipboard");
              })
            }}>Copy</button>

            {/*edit button  */}
            <button onClick={()=>{
              setEditPassword({
                arrayIndex:index,
                passwordName:item.name,
                passwordValue:item.password
              })
              
            }}>Edit</button>

            </span>
            </p>
        )
      })}

      </div>
      <button className='create-password-btn' onClick={()=>{
        setCreatePassword(true);

      }}
      style={{
        scale:"1.5",
        marginTop:"12px"
      }}
      >+</button>
    </>
  )
};

export default PasswordList;
