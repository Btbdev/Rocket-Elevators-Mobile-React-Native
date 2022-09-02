import { Button, StyleSheet, Text, View, Image } from "react-native";
import * as React from "react";
import { NavigationContainer, useIsFocused } from "@react-navigation/native";
import axios from "axios";
import { useState, useEffect } from "react";
import {
  Heading,
  Select,
  Stack,
  HStack,
  useStyledSystemPropsResolver,
} from "native-base";
import { SafeAreaView, FlatList, Style, StatusBar, Box } from "react-native";

// To get the elevator list
let currentList = [];
const getElevators = async (setElevators) => {
  try {
    const res = await axios.get(
      " https://eb60-142-169-125-10.ngrok.io/api/Elevators/list"
    );
    currentList = res.data;

    setElevators(res.data);
  } catch (err) {
    console.warn("[getElevators] Error:", err);
  }
};

export default function HomeScreen({ navigation }) {
  const [elevators, setElevators] = useState([]);
  const isFocused = useIsFocused();

  useEffect(() => {
    if (isFocused) {
      getElevators(setElevators);
    }
    console.log("elevator list111 is:", elevators);
  }, [isFocused]);

  useEffect(() => {
    console.log("elevator list is:", elevators);
  }, [elevators]);

  const renderItem = ({ item }) => (
    <Item
      id={item.id}
      status={item.status}
      serial_number={item.serial_number}
    />
  );

  const itemOnPress = (id, status) => {
    console.log("selected item id is:", id);

    navigation.navigate("Elevator", { elevatorID: id });
  };

  const Item = ({ id, serial_number }) => (
    <View style={styles.item}>
      <HStack space={5}>
        <Button
          color="rgb(10, 100, 160)"
          title={`${id}`}
          onPress={() => itemOnPress(id)}
        />

        <Text
          style={{ fontSize: 15, color: "#fff", alignSelf: "center" }}
          fontSize="xs"
          _light={{
            color: "violet.500",
          }}
          _dark={{
            color: "violet.400",
          }}
          fontWeight="500"
          ml="-0.5"
          mt="-1"
        >
          Serial number {serial_number}
        </Text>
      </HStack>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <Image style={styles.logo} source={require("../assets/R2.png")} />
      <Text style={styles.text}>
        Push the elevator button ID to get all his infos
      </Text>

      <FlatList
        data={elevators}
        backgroundColor="#fff"
        renderItem={renderItem}
        keyExtractor={(item) => [item.id]}
      />

      <View style={styles.position}>
        <Button
          color="rgb(10, 100, 160)"
          title="Logout"
          onPress={() => navigation.replace("Login")}
        />
      </View>
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
    padding: 25,
    marginVertical: 5,
    marginHorizontal: 16,
    width: 200,
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
    marginBottom: 25,
  },
  position: {
    marginBottom: 25,
    alignSelf: "stretch",
    marginTop: 50,
    paddingBottom: 15,
    // backgroundColor: "#ff5",
  },
});
