// import { StatusBar } from "expo-status-bar";
import { Button, StyleSheet, Text, View, Image } from "react-native";
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
      "    https://7af9-2001-56b-bc6d-7400-80f7-de5a-e35b-8fc.ngrok.io/api/Elevators/list"
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
  // const [elevatorID, setElevatorID] = useState({}); cela servira à passer la valeur (objet) vers autre page

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
      <Image style={styles.logo} source={require("../assets/R2.png")} />
      <Text style={styles.text}>Non operational elevator list</Text>

      <FlatList
        data={elevators}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      />
      {/* <Button
        title="Call the API"
        onPress={() => getElevators(currentList.id)}
      /> */}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
    // justifyContent: "center",
    alignItems: "center",
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
  text: {
    justifyContent: "center",
  },
  logo: {
    width: 200,
    height: 75,
    resizeMode: "contain",
    marginBottom: 25,
  },
});
