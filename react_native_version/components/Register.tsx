import axios from 'axios';
import {
  Button,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  ToastAndroid,
} from 'react-native';
import Toast from 'react-native-toast-message';
import {useDetails} from '../context/UserContext';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../App';

type RegistrationScreenNavProps = StackNavigationProp<RootStackParamList,"Register">;

const Register = ({navigation}:{navigation:RegistrationScreenNavProps}) => {
  const {email, setEmail, masterPassword, setMasterPassword,passwords,setPasswords} = useDetails();


    async function goToPasswordScreen(){
        if (email && masterPassword) {
            const apiUrl = 'https://bitkoth.onrender.com/api/add-user';
            const postData = {
              email: email,
              masterPassword: masterPassword,
            };
      
            console.log(postData);
      
            try {
              const response = await axios.post(apiUrl, postData, {
                headers: {
                  'Content-Type': 'application/json',
                },
              });
      
              console.log(response.data)

              navigation.replace("PasswordScreen")
      
              // Handle the response as needed
      
            } catch (error) {
              if (axios.isAxiosError(error) && error.response) {
                const statusCode = error.response.status;
      
                if (statusCode === 404) {
                  
                  Toast.show({
                    text1:"User Already Exists",
                    type:'error',
                    visibilityTime:2000
                  })
                } 
              } 
            }
          }
          else{
            Toast.show({
              type:'error',
              text1:"please enter both the credentials",
              visibilityTime:2000
            })
          }
    }

  return (
    <View style={styles.MainContainer}>
      <Text style={styles.Heading}>BitKoth</Text>
      <TextInput
        style={styles.InputField}
        placeholder="Set Email"
        onChangeText={text => setEmail(text)}
        value={email}
      />

      <TextInput
        style={styles.InputField}
        placeholder="Set Master Password"
        secureTextEntry
        onChangeText={text => setMasterPassword(text)}
        value={masterPassword}
      />

      <Button title="Register" color={'#720455'} onPress={goToPasswordScreen} />
      <Text style={{color: '#910A67'}} onPress={()=>navigation.navigate("Login")}>Login</Text>
      <Toast />
    </View>
  );
};

const styles = StyleSheet.create({
  MainContainer: {
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: '#030637',
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    gap: 20,
  },

  Heading: {
    fontSize: 54,
    color: 'white',
    textAlign: 'center',
  },
  InputField: {
    color: 'white',
    paddingHorizontal: 12,
    borderColor: '#3C0753',
    borderWidth: 1,
    width: '70%',
    borderRadius: 14,
    textAlign: 'center',
  },
});
export default Register;
