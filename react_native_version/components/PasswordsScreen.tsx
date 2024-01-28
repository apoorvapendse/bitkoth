import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {useDetails} from '../context/UserContext';
import Toast from 'react-native-toast-message';
import {useEffect} from 'react';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../App';

type PasswordScreenPropType = StackNavigationProp<RootStackParamList,"PasswordScreen">
const PasswordsScreen = ({navigation}:{navigation:PasswordScreenPropType}) => {
  const {passwords} = useDetails();


  useEffect(() => {
    Toast.show({
      type: 'success',
      text1: 'Logged In Successfully!',
    });
  }, []);


  function editPassword(idx:number){
    navigation.push("PasswordEdit",{passwordName:passwords[idx].name,passwordValue:passwords[idx].password,passwordIndex:idx})
  }
  return (
    <ScrollView contentContainerStyle={styles.MainContainer}>
      {passwords.map((item,index) => 


        <View key={item._id} style={styles.PasswordBox}>
          <Text style={styles.NormalText}>{item.name}</Text>
          <Text style={styles.NormalText}>{item.password}</Text>
          <View style={styles.IconsContainer}>

            <TouchableOpacity>
              <Icon name="eye" size={30} color="#fff" />
            </TouchableOpacity>
            <TouchableOpacity onPress={()=>editPassword(index)}>
              <Icon name="edit" size={30} color="#fff" />
            </TouchableOpacity>
            <TouchableOpacity>
              <Icon name="trash" size={30} color="#910A67" />
            </TouchableOpacity>

          </View>
        </View>
      )}

      <Toast />
    </ScrollView>
  );
};

export default PasswordsScreen;

const styles = StyleSheet.create({
  MainContainer: {
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
  IconsContainer:{
    display:"flex",
    flexDirection:"row",
    justifyContent:"space-evenly",
    marginTop:10
  }
});
