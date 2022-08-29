// import { StatusBar } from "expo-status-bar";
import { Button, StyleSheet, Text, View } from "react-native";
import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
// import { Stack } from "react-bootstrap";

function LoginScreen({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>Login Screen</Text>
      <Button title="Go to Home" onPress={() => navigation.navigate("Home")} />
    </View>
  );
}

function HomeScreen({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>Details Screen to get the list of all elevators non operational</Text>
      <Button title="Go to Elevators" onPress={() => navigation.navigate("Elevator")} />
    </View>
  );
}

function ElevatorScreen({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>Elevator Screen to check the status of 1 elevator(ther choosen one)</Text>
      <Button title="Back to Home" onPress={() => navigation.navigate("Home")} />
    </View>
  );
}

const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{
            title: "Login",
            headerStyle: {
              backgroundColor: "#f4511e",
            },
            headerTintColor: "#fff",
            headerTitleStyle: {
              fontWeight: "bold",
            },
          }}
        />
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Elevator" component={ElevatorScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
