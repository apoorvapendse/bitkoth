import '../list.css'
interface PasswordType {
  name: string;
  password: string;
  _id: string; // Assuming _id is a string, adjust accordingly
}

interface PropType {
  passwords: PasswordType[]|undefined;
}

const PasswordList = ({ passwords }: PropType) => {
  console.log(passwords);
  return(
    <>
    <h3>Previous Passwords</h3>
    {passwords?.map((item)=>{
        return(
            <p>
            <span className="password-text">Name:{item.name}</span>
            <br />
            <span className="password-text">Password:{item.password}</span>
            </p>
        )
    })}
    </>
  )
};

export default PasswordList;
