import { StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import {Slider} from '@react-native-assets/slider';
import BouncyCheckbox from 'react-native-bouncy-checkbox';
import axios from 'axios';
import {useDetails} from '../context/UserContext';
import Toast from 'react-native-toast-message';
import React, { useState } from "react";

function NewPasswordScreen({navigation}:{navigation:any}){

    const {email,masterPassword} = useDetails();
    const [len, setLen] = useState<number>(8);
    const [newPassName, setNewPassName] = useState("testname");
    const [newPassVal, setNewPassVal] = useState("testpass");
    const [addNumbers, setAddNumbers] = useState<boolean>(false);
    const [addSpecialChars, setAddSpecialChars] = useState<boolean>(false);
  
    const alphaString = 'abcdefghijklmnopqrstuvwxyz';
    const numsString = '0123456789';
    const specialChars = '!@#$%^&*(){}[]';
  
    function updatePass() {
      let newPass = '';
      let allowedChars = alphaString;
      if (addNumbers) {
        allowedChars += numsString;
      }
      if (addSpecialChars) {
        allowedChars += specialChars;
      }
  
      for (let i = 0; i < len; i++) {
        newPass += allowedChars[Math.floor(Math.random() * allowedChars.length)];
      }
  
      setNewPassVal(newPass);
    }

    async function addNewPassword()
    {
        if (newPassName && newPassVal) {
            const apiURL = 'https://bitkoth.onrender.com/api/add-password';
            const postData = {
              email: email,
              passwordName: newPassName,
              passwordValue: newPassVal,
              masterPassword:masterPassword
            };
            try {
              let response = await axios.post(apiURL, postData, {
                headers: {
                  'Content-Type': 'application/json',
                },
              });
              console.log(response.data);
              
      
      
              Toast.show({
                type: 'success',
                text1: 'Password created sucessfully!',
                visibilityTime: 2000,
              });
              setTimeout(() => {
                navigation.pop(1);
              }, 2000);
            } catch (error) {
              if (axios.isAxiosError(error) && error.response) {
                const statusCode = error.response.status;
      
                if (statusCode === 404) {
                  Toast.show({
                    text1: 'User Does not Exists',
                    type: 'error',
                    visibilityTime: 2000,
                  });
                }
                if (statusCode === 400) {
                  Toast.show({
                    text1: 'Invalid Array Index',
                    type: 'error',
                    visibilityTime: 2000,
                  });
                }
                if (statusCode === 500) {
                  Toast.show({
                    text1: `${error.message}`,
                    type: 'error',
                    visibilityTime: 2000,
                  });
                }
              }
            }
          } else {
            Toast.show({
              type: 'error',
              text1: 'Please Enter Both Values',
            });
          }

    }
return(

    <View style={styles.MainContainer}>
    <Text style={styles.Heading}>New Password</Text>
    <TextInput
      value={newPassName}
      placeholder="set new name"
      onChangeText={text => setNewPassName(text)}
      style={styles.Input}
    />

    <TextInput
      value={newPassVal}
      placeholder="set new val"
      style={styles.Input}
      onChangeText={text => setNewPassVal(text)}
    />
    <Slider
      minimumValue={8}
      step={1}
      maximumValue={20}
      style={styles.Slider}
      value={len}
      onValueChange={val => {
        setLen(val);
        updatePass();
      }}></Slider>

    <BouncyCheckbox
      size={25}
      fillColor="blue"
      textStyle={{
        textDecorationLine: 'none',
      }}
      unfillColor="#FFFFFF"
      text="Numbers"
      iconStyle={{borderColor: 'red'}}
      innerIconStyle={{borderWidth: 2}}
      onPress={(isChecked: boolean) => {
        setAddNumbers(prev=>!prev);
        updatePass();
      }}
    />
    <BouncyCheckbox
      size={25}
      fillColor="blue"
      textStyle={{
        textDecorationLine: 'none',
      }}
      unfillColor="#FFFFFF"
      text="Special Chars "
      iconStyle={{borderColor: 'red'}}
      innerIconStyle={{borderWidth: 2}}
      onPress={(isChecked: boolean) => {
        setAddSpecialChars(prev=>!prev);
        updatePass();
      }}
    />
    <Text style={styles.currentLength}>Length:{len}</Text>

    <TouchableOpacity style={styles.SaveBtn} onPress={addNewPassword}>
      <Text style={styles.SaveText}>Save</Text>
    </TouchableOpacity>
    <Toast />
  </View>
)

}

const styles = StyleSheet.create({
    MainContainer: {
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: '#030637',
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
        gap: 20,
      },Heading: {
        color: 'white',
        fontSize: 34,
      },Input: {
        borderWidth: 1,
        borderColor: '#910A67',
        textAlign: 'center',
        width: 293,
        borderRadius: 12,
      },
      Slider: {
        padding: 12,
        color: 'white',
        width: 180,
        height: 30,
      },
      currentLength: {
        color: 'white',
        fontSize: 22,
      },
      SaveBtn: {
        backgroundColor: 'white',
        paddingHorizontal: 21,
        paddingVertical: 4,
        borderRadius: 12,
      },
      SaveText: {
        color: '#3C0753',
        fontWeight: '700',
        fontSize: 21,
      },
})

export default NewPasswordScreen