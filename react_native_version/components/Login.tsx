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

const Login = ({navigation}: {navigation: any}) => {
  const {
    email,
    setEmail,
    masterPassword,
    setMasterPassword,
    passwords,
    setPasswords,
  } = useDetails();

 
  async function goToSecondScreen() {
    if (email && masterPassword) {
      const apiUrl = 'https://bitkoth.onrender.com/api/get-all-passwords';
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

        let passwords = response.data.passwords;
        setPasswords(passwords);
        navigation.replace("Screen2")

        // Handle the response as needed

      } catch (error) {
        if (axios.isAxiosError(error) && error.response) {
          const statusCode = error.response.status;

          if (statusCode === 403) {
            
            Toast.show({
              text1:"Wrong username or password",
              type:'error',
              visibilityTime:2000
            })
          } 
          if (statusCode === 404) {
            
            Toast.show({
              text1:"User Does not exist",
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
        placeholder="Enter Email"
        onChangeText={text => setEmail(text)}
        value={email}
      />

      <TextInput
        style={styles.InputField}
        placeholder="Enter Master Password"
        secureTextEntry
        onChangeText={text => setMasterPassword(text)}
        value={masterPassword}
      />

      <Button title="Login" color={'blueviolet'} onPress={goToSecondScreen} />

      <Toast />
    </View>
  );
};

const styles = StyleSheet.create({
  MainContainer: {
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: 'black',
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
    borderColor: 'white',
    borderWidth: 1,
    width: '70%',
    borderRadius: 14,
    textAlign: 'center',
  },
});
export default Login;
