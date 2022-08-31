// import { StatusBar } from "expo-status-bar";
import { Button, StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NativeBaseProvider, Box, FormControl, Input, Stack } from "native-base";
import { useState, useEffect } from "react";
import axios from "axios";

// employee in the list : Kirby Walsh email : ward@bins.com id: 33
export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // console.log("Email:", email);
  // console.log("Password is:", password);

  useEffect(() => {
    console.log("email is:", email);
  }, [email]);

  // havetogoodngrokaddress.ngrok.io/api/Employees?email=rudy@moen.net"
  const getEmployee = async () => {
    try {
      const res = await axios.get(` https://5290-2001-56b-bc6d-7400-743a-92d4-fa76-22d3.ngrok.io/api/Employees?email=${email}`);
      console.log("Validate email of employee:", res);

      const currentEmployee = res.data;
      console.log("The current employee is validated:", currentEmployee);
      if (currentEmployee == true) {
        navigation.navigate("Home");
      } else {
        alert("You are not allowed");
      }
    } catch (err) {
      console.warn("[getEmployee] Error:", err);
    }
  };

  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>
        {/* <Box flex={1} bg="#fff" alignItems="center" justifyContent="center"> */}
        <Text style={{ justifyContent: "center" }}>Connect to your account</Text>
        {/* </Box> */}
        <Box alignItems="center">
          <Box w="300px" maxWidth="100%">
            <FormControl isRequired>
              <Stack mx="4">
                <FormControl.Label>Email</FormControl.Label>
                <Input type="Email" defaultValue="" placeholder="email" onChangeText={(email) => setEmail(email)} />
              </Stack>
              <Stack mx="4">
                <FormControl.Label>Password</FormControl.Label>
                <Input type="password" defaultValue="12345" placeholder="password" onChangeText={(password) => setPassword(password)} />
                {/* <FormControl.HelperText>Must be atleast 6 characters.</FormControl.HelperText>
                <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs" />}>Atleast 6 characters are required.</FormControl.ErrorMessage> */}
              </Stack>
            </FormControl>
          </Box>
        </Box>
      </Text>
      <Button title="Login" onPress={() => getEmployee()}></Button>
    </View>
  );
}
