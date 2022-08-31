// import { StatusBar } from "expo-status-bar";
import { Button, StyleSheet, Text, View } from "react-native";
import * as React from "react";
// import { NavigationContainer } from "@react-navigation/native";
// import { createNativeStackNavigator } from "@react-navigation/native-stack";
import axios from "axios";
import { useState, useEffect } from "react";
import { Heading, Select } from "native-base";
import { SafeAreaView, FlatList, Style, StatusBar } from "react-native";
import { ActivityIndicator } from "react-native-web";

// To get the elevator list
let currentList = [];
const getElevators = async (setElevators) => {
  try {
    const res = await axios.get(
      "  https://5290-2001-56b-bc6d-7400-743a-92d4-fa76-22d3.ngrok.io/api/Elevators/list"
    );
    currentList = await res.data;

    setElevators(res.data);
  } catch (err) {
    console.warn("[getElevators] Error:", err);
  }
};

// hardcoded values for test
const DATA = [
  {
    id: "1",
    title: "First Item",
    status: "Inactive",
  },
  {
    id: "2",
    title: "Second Item",
    status: "Active",
  },
  {
    id: "3",
    title: "Third Item",
    status: "Active",
  },
];

export default function HomeScreen({ navigation }) {
  const [elevators, setElevators] = useState([]);

  useEffect(() => {
    getElevators(setElevators);

    console.log("elevator list111 is:", elevators);
  }, []);

  useEffect(() => {
    console.log("elevator list is:", elevators);
  }, [elevators]);

  const renderItem = ({ item }) => <Item id={item.id} />;

  const itemOnPress = (id) => {
    console.log("selected item id is:", id);

    navigation.navigate("Elevator", { elevatorID: id });
  };

  const Item = ({ id }) => (
    <View style={styles.item}>
      <Button title={`${id}`} onPress={() => itemOnPress(id)} />
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <Heading>Non operational elevator list</Heading>
      <FlatList
        data={elevators}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      />
      <Button
        title="Call the API"
        onPress={() => getElevators(currentList.id)}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
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
});
