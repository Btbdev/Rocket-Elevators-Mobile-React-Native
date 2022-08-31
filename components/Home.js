// import { StatusBar } from "expo-status-bar";
import { Button, StyleSheet, Text, View } from "react-native";
import * as React from "react";
// import { NavigationContainer } from "@react-navigation/native";
// import { createNativeStackNavigator } from "@react-navigation/native-stack";
import axios from "axios";
import { useState, useEffect } from "react";
import { Select } from "native-base";
import { SafeAreaView, FlatList, Style, StatusBar } from "react-native";

// https://b177-2001-56b-bc6d-7400-c04c-a395-8871-8d76.ngrok.io/api/Elevators/list
// To get the elevator list
let currentList = [];
const getElevators = async () => {
  try {
    const res = await axios.get("https://5883-2001-56b-bc6d-7400-743a-92d4-fa76-22d3.ngrok.io/api/Elevators/list");
    console.log("getElevators res:", res);

    const currentList = res.data;
    console.log("The current list is:", currentList);
    // localStorage.setItem("customerbuilding", currentList);
    currentList.map((e) => {
      console.log(e);
    });
    // return res;
  } catch (err) {
    console.warn("[getElevators] Error:", err);
  }
};

//data from api call
// id: 170, status: Inactive, serial_number: 37457027, model: premium, elevator_type: corporate, last inspection: date...

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
  const renderItem = ({ item }) => <Item title={item.title} id={item.id} status={item.status} />;

  const itemOnPress = (id) => {
    console.log("selected item id is:", id);

    navigation.navigate("myScreen", { elevatorID: id });
  };

  const Item = ({ title, id, status }) => (
    <View style={styles.item}>
      <Button title={status} onPress={() => itemOnPress(status)} />
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <FlatList data={DATA} renderItem={renderItem} keyExtractor={(item) => item.id} />
      <Button title="Call the API" onPress={() => getElevators(currentList.id)}>
        // //{" "}
      </Button>
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

// useEffect(() => {
//   getElevators();
//   console.log("email is:", getElevators);
// }, []);

// export default function HomeScreen({ navigation }) {
// return (
//   <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
//     <Text>Some Details Screen to get the list of all elevators non operational</Text>
//     <Button title="Call the API" onPress={() => getElevators(currentList.id)}>
//       With Axios
//     </Button>

//     <Button title="Go to Elevators" onPress={() => navigation.navigate("Elevator")} />
//   </View>
// );
// }
