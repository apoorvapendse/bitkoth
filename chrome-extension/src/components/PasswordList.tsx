
interface PasswordType {
  name: string;
  password: string;
  _id: string; // Assuming _id is a string, adjust accordingly
}

interface PropType {
  passwords: string | undefined;
}

const PasswordList = ({ passwords }: PropType) => {
  try {
    if (passwords) {
      const jsonArr: PasswordType[] = passwords.split('\n').map((jsonString: string) => JSON.parse(jsonString.trim()));
        console.log("jsonarr:",jsonArr);
      return (
        <>
          <h1>Previous passwords</h1>
          {jsonArr.map((password, index) => (
            <div key={index}>
              <p>Name: {password.name}</p>
              <p>Password: {password.password}</p>
            </div>
          ))}
        </>
      );
    } else {
      return <p>No passwords provided</p>;
    }
  } catch (error) {
    console.error('Error parsing JSON:', error);
    return <p>Error parsing JSON</p>;
  }
};

export default PasswordList;
