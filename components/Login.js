import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, Image } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import {
  NativeBaseProvider,
  Box,
  FormControl,
  Input,
  Stack,
  Button,
} from "native-base";
import { useState, useEffect } from "react";
import axios from "axios";

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    console.log("email is:", email);
  }, [email]);

  const getEmployee = async () => {
    try {
      const res = await axios.get(
        `   https://7af9-2001-56b-bc6d-7400-80f7-de5a-e35b-8fc.ngrok.io/api/Employees?email=${email}`
      );
      console.log("Validate email of employee:", res);

      const currentEmployee = res.data;
      console.log("The current employee is validated:", currentEmployee);
      if (currentEmployee == true) {
        navigation.navigate("Home");
      } else {
        alert("Your email is not the one of a listed employee");
      }
    } catch (err) {
      console.warn("[getEmployee] Error:", err);
    }
  };

  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Image style={styles.logo} source={require("../assets/R2.png")} />
      {/* <Text> */}
      <Box style={styles.text} alignItems="center" justifyContent="center">
        <Text>Connect to your account</Text>
      </Box>
      <Box stylesalignItems="center">
        <Box w="300px" maxWidth="100%">
          <FormControl isRequired>
            <Stack mx="4">
              <FormControl.Label>Email</FormControl.Label>
              <Input
                type="Email"
                defaultValue=""
                placeholder="email"
                onChangeText={(email) => setEmail(email)}
              />
            </Stack>
            <Stack mx="4">
              <FormControl.Label>Password</FormControl.Label>
              <Input
                type="password"
                defaultValue=""
                placeholder="password"
                onChangeText={(password) => setPassword(password)}
              />
            </Stack>
          </FormControl>
        </Box>
      </Box>
      {/* </Text> */}
      <Button
        style={styles.Button}
        colorScheme="rgb(10, 100, 160)"
        size={"lg"}
        onPress={() => getEmployee()}
      >
        Login
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 50,
  },
  item: {
    backgroundColor: "rgb(175, 11, 25)",
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 35,
  },
  logo: {
    width: 200,
    height: 75,
    resizeMode: "contain",
    marginBottom: 75,
  },
  Button: {
    marginTop: 55,
    width: 200,
  },
  text: {
    paddingBottom: 40,
  },
});
