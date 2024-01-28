import { Text } from "react-native";

function PasswordEdit({route,navigation}:any){

    let {passwordName,passwordValue,passwordIndex} = route.params;
    console.log(passwordName,passwordValue,passwordIndex)
    return(
        <Text>Passowrd Edit Screen</Text>
    )
}

export default PasswordEdit;