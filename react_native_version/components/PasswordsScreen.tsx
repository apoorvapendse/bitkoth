import { ScrollView, StyleSheet, Text, View } from "react-native";
import { useDetails } from "../context/UserContext";
import Toast from "react-native-toast-message";
import { useEffect } from "react";

interface PassObj {
  _id: string;
  name: string;
  password: string;
}

const PasswordsScreen = () => {
  const { passwords } = useDetails();
  useEffect(()=>{
    Toast.show({
      type:"success",
      text1:"Logged In Successfully!"
    })
  },[])
  return (
    <ScrollView contentContainerStyle={styles.MainContainer}>
      {passwords.map((item) => (
        <View key={item._id} style={styles.PasswordBox}>
          <Text style={styles.NormalText}>{item.name}</Text>
          <Text style={styles.NormalText}>{item.password}</Text>
        </View>
      ))}

      <Toast/>
    </ScrollView>
  );
};

export default PasswordsScreen;

const styles = StyleSheet.create({
  MainContainer: {
    flexGrow: 1,
    backgroundColor: 'black',
    alignItems: 'center',
    justifyContent: 'center',
  },
  PasswordBox: {
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
});
