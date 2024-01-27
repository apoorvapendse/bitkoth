import { ReactNode, createContext,useContext, useState } from "react";
export interface UserContextType {
    email: string;
    setEmail: React.Dispatch<React.SetStateAction<string>>;
    masterPassword: string;
    setMasterPassword: React.Dispatch<React.SetStateAction<string>>;
    passwords:PassObjType[],
    setPasswords:React.Dispatch<React.SetStateAction<PassObjType[]>>;
  }
  
export interface PassObjType{
    _id:string;
    name:string;
    password:string
}
const UserContext = createContext<UserContextType|undefined>(undefined);
interface UserProviderProps{
    children:ReactNode
}

export const UserContextProvider:React.FC<UserProviderProps> = ({ children })=>{

    const [email,setEmail] = useState<string>("")
    const [masterPassword,setMasterPassword] = useState<string>("")
    const [passwords,setPasswords] = useState<PassObjType[]>([])

    const contextValue = {
        email,setEmail,masterPassword,setMasterPassword,passwords,setPasswords
    }

    return(
    <UserContext.Provider value={contextValue}>
        {children}
    </UserContext.Provider>
    )
}


export const useDetails = (): UserContextType => {
    const context = useContext(UserContext);
  
    if (!context) {
      throw new Error("userContext must be used within a userContextProvider");
    }
  
    return context;
  };
