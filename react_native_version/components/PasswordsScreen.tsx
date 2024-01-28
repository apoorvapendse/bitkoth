import {
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {useDetails} from '../context/UserContext';
import Toast from 'react-native-toast-message';
import {useEffect, useState} from 'react';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParamList} from '../App';
import axios from 'axios';
import React from 'react';
import Clipboard from '@react-native-clipboard/clipboard';


type PasswordScreenPropType = StackNavigationProp<
  RootStackParamList,
  'PasswordScreen'
>;
const PasswordsScreen = ({
  navigation,
}: {
  navigation: PasswordScreenPropType;
}) => {
  const {passwords, email, masterPassword, setPasswords} = useDetails();
  const [refreshing, setRefreshing] = useState<boolean>(false);

  useEffect(() => {
    Toast.show({
      type: 'success',
      text1: 'Logged In Successfully!',
    });
  }, []);

  function goToNewPasswordScreen(){
    navigation.push("NewPasswordScreen")
  }
  function editPassword(idx: number) {
    navigation.push('PasswordEdit', {
      passwordName: passwords[idx].name,
      passwordValue: passwords[idx].password,
      passwordIndex: idx,
    });
  }
  async function fetchPasswords() {
    const updatedListOfPasswords = await axios.post(
      `https://bitkoth.onrender.com/api/get-all-passwords`,
      {email, masterPassword},
      {
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );
    console.log(updatedListOfPasswords.data);
    setPasswords(updatedListOfPasswords.data.passwords);
  }
  async function handleDeletion(idx: number) {
    const apiURL = `https://bitkoth.onrender.com/api/delete-password`;
    let bodyObj = {
      email: email,
      masterPassword: masterPassword,
      arrayIndex: idx,
    };

    const response = await axios.post(apiURL, bodyObj, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    console.log(response.data);
    await fetchPasswords();
    Toast.show({
      text1: 'Password deleted successfully!',
      type: 'success',
    });

  }

  const onRefresh = async () => {
    setRefreshing(true);
    await fetchPasswords();
    setRefreshing(false);
  };

  function copyToClipboard(index:number)
  {
    Clipboard.setString(passwords[index].password);
    Toast.show({
      visibilityTime:1500,
      text1:"Password Copied To Clipboard",
      type:"success"
    })
  }

  return (
    <ScrollView
      contentContainerStyle={styles.MainContainer}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }>
      <TouchableOpacity onPress={goToNewPasswordScreen}>
        <Icon name="plus-circle" size={50} color={'white'} />
      </TouchableOpacity>

      {passwords.map((item, index) => (
        <View key={item._id} style={styles.PasswordBox}>
          <Text style={styles.NormalText}>{item.name}</Text>
          <Text style={styles.NormalText}>{item.password}</Text>
          <View style={styles.IconsContainer}>
            <TouchableOpacity onPress={()=>copyToClipboard(index)}>
              <Icon name="copy" size={30} color="#fff" />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => editPassword(index)}>
              <Icon name="edit" size={30} color="#fff" />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handleDeletion(index)}>
              <Icon name="trash" size={30} color="#910A67" />
            </TouchableOpacity>
          </View>
        </View>
      ))}
      <Toast />
    </ScrollView>
  );
};

export default PasswordsScreen;

const styles = StyleSheet.create({
  MainContainer: {
    paddingTop: 22,
    flexGrow: 1,
    backgroundColor: '#030637',
    alignItems: 'center',
    justifyContent: 'center',
  },
  PasswordBox: {
    display: 'flex',
    flexDirection: 'column',
    borderWidth: 1,
    borderColor: 'white',
    width: 250,
    padding: 15,
    margin: 12,
    borderRadius: 12,
  },
  NormalText: {
    color: 'white',
  },
  IconsContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginTop: 10,
  },
});
