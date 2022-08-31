import { Button, StyleSheet, Text, View } from "react-native";
import * as React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
// import { NavigationContainer } from "@react-navigation/native";
// import { createNativeStackNavigator } from "@react-navigation/native-stack";

// to change the choosen elevator status
const changeElevator = async (setElevators) => {
  try {
    const res = await axios.get(
      "  https://5290-2001-56b-bc6d-7400-743a-92d4-fa76-22d3.ngrok.io/api/Elevators/150"
    );
    console.log("infos about elevator:", res.data);
    setElevators(res.data);
  } catch (err) {
    console.warn("[getElevators] Error:", err);
  }
};
// getElevatorData(elevatorID, setElevatorData);

export default function ElevatorScreen({ navigation, elevatorID }) {
  const [elevatorData, setElevatorData] = useState({});

  useEffect(() => {
    // getElevatorData(elevatorID, setElevatorData);
    // console.log("elevator list111 is:", elevators);
  }, []);

  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>
        Elevator Screen to check the status of 1 elevator(the choosen one)
      </Text>
      <Button
        title="Back to Home"
        onPress={() => navigation.navigate("Home")}
      />
      <Button title="Elevator call" onPress={() => changeElevator()} />
    </View>
  );
}
