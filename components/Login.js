// import { StatusBar } from "expo-status-bar";
import { Button, StyleSheet, Text, View } from "react-native";
import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
// import { Stack } from "react-bootstrap";
// import { NativeBaseProvider, Box, FormControl, Stack, Input } from "native-base";

export default function LoginScreen({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>
        Login Screen
        {/* <Box alignItems="center">
          <Box w="100%" maxWidth="300px">
            <FormControl isRequired>
              <Stack mx="4">
                <FormControl.Label>Password</FormControl.Label>
                <Input type="password" defaultValue="12345" placeholder="password" />
                <FormControl.HelperText>Must be atleast 6 characters.</FormControl.HelperText>
                <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs" />}>Atleast 6 characters are required.</FormControl.ErrorMessage>
              </Stack>
            </FormControl>
          </Box>
        </Box> */}
        ;
      </Text>
      <Button title="Go to Home" onPress={() => navigation.navigate("Home")} />
    </View>
  );
}
