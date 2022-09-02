import { Button, StyleSheet, Text, View, Image } from "react-native";
import * as React from "react";
import { useState, useEffect } from "react";
import { NavigationContainer, useIsFocused } from "@react-navigation/native";
import axios from "axios";
import { SafeAreaView, FlatList, Style, StatusBar } from "react-native";
import {
  VStack,
  Center,
  Box,
  AspectRatio,
  Heading,
  Stack,
  HStack,
  NativeBaseProvider,
  InfoIcon,
  ThreeDotsIcon,
} from "native-base";

// to get the choosen elevator data
const getElevatorData = async (elevatorID, setElevatorData) => {
  try {
    const res = await axios.get(
      ` https://eb60-142-169-125-10.ngrok.io/api/Elevators/${elevatorID}`
    );
    setElevatorData(res.data);
  } catch (err) {
    console.warn("[getElevatorData] Error:", err);
  }
};

// to update the choosen elevator status
const updateElevatorStatus = async (elevatorID, setElevatorStatus) => {
  try {
    const res = await axios.put(
      ` https://eb60-142-169-125-10.ngrok.io/api/Elevators/changeStatusToActive/${elevatorID}`
    );
    setElevatorStatus(res.data);
  } catch (err) {
    console.warn("[updateElevatorStatus] Error:", err);
  }
};

export default function ElevatorScreen({ navigation, route }) {
  const { elevatorID } = route.params;
  const [elevatorData, setElevatorData] = useState({});
  const [elevatorStatus, setElevatorStatus] = useState("");

  const statusColor = elevatorData
    ? elevatorData.status == "Active"
      ? "green"
      : "red"
    : "red";

  const displayBackButton = elevatorData.status != "Active" ? "none" : "flex";

  useEffect(() => {
    getElevatorData(elevatorID, setElevatorData);
  }, []);

  useEffect(() => {
    console.log("elevatorStatus is:", elevatorStatus);

    if (elevatorStatus != "") {
      getElevatorData(elevatorID, setElevatorData);
    }
  }, [elevatorStatus]);

  const renderItem = ({ item }) => <Item status={item.status} id={item.id} />;

  const itemOnPress = (id) => {
    console.log("selected item id is:", id);

    navigation.navigate("Elevator", { elevatorID: id });
  };

  const Item = ({ status, id }) => (
    <View style={styles.item}>
      <Button title={status} onPress={() => itemOnPress(id)} />
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <Image style={styles.logo} source={require("../assets/R2.png")} />
      <Text>
        <Box alignItems="center">
          <Box
            maxW="300"
            rounded="lg"
            overflow="hidden"
            borderColor="coolGray.200"
            borderWidth="1"
            _dark={{
              borderColor: "coolGray.600",
              backgroundColor: "gray.700",
            }}
            _web={{
              shadow: 2,
              borderWidth: 0,
            }}
            _light={{
              backgroundColor: "gray.50",
            }}
          >
            <Stack p="4" space={3}>
              <Stack space={2}>
                <Heading size="md" ml="-1" textAlign={"center"}>
                  Update your Elevator
                </Heading>
                <HStack space={5}>
                  <Text
                    style={{ fontSize: 15 }}
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
                    ID : {elevatorData.id}
                  </Text>
                </HStack>
                <Text
                  style={{ fontSize: 15 }}
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
                  Type : {elevatorData.elevator_type}
                </Text>
                <Text
                  style={{ fontSize: 14, flexWrap: "nowrap" }}
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
                  Last inspection date :{elevatorData.last_inspection_date}
                </Text>
                <Text
                  style={{ fontSize: 15 }}
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
                  Serial number : {elevatorData.serial_number}
                </Text>
              </Stack>

              <HStack
                alignItems="center"
                space={4}
                justifyContent="space-between"
              >
                <HStack alignItems="center">
                  <Text
                    style={{ fontSize: 20 }}
                    color="coolGray.600"
                    _dark={{
                      color: "warmGray.200",
                    }}
                    fontWeight="400"
                  >
                    Elevator status:
                    <Text
                      style={{
                        color: statusColor,
                        fontWeight: "bold",
                        fontSize: 20,
                      }}
                    >
                      {elevatorData.status}
                    </Text>
                  </Text>
                </HStack>
              </HStack>
            </Stack>
          </Box>
        </Box>
      </Text>
      <View style={styles.update}>
        <Button
          title="Update Status"
          color="rgb(10, 100, 160)"
          onPress={() => updateElevatorStatus(elevatorID, setElevatorStatus)}
        />
      </View>

      <View
        style={{
          flexDirection: "column",
          marginTop: 20,
          justifyContent: "flex-start",
          alignContent: "space-around",
          alignSelf: "stretch",
          display: displayBackButton,
        }}
      >
        <Button
          title="Back to Home"
          color="rgb(10, 100, 160)"
          onPress={() => navigation.navigate("Home")}
        />
      </View>
      <View style={styles.displayButton}>
        <Button
          title="Logout"
          color="rgb(10, 100, 160)"
          onPress={() => navigation.replace("Login")}
        />
      </View>

      {/* <Button title="Elevator call" onPress={() => getElevatorData()} /> */}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
    alignItems: "center",
    maxWidth: "100%",
  },
  item: {
    backgroundColor: "#fff",
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 35,
  },
  logo: {
    width: 200,
    maxWidth: 400,
    height: 75,
    resizeMode: "contain",
    marginBottom: 15,
    marginTop: 25,
    justifyContent: "center",
    alignItems: "center",
  },
  displayButtonHomeNone: {
    flexDirection: "column",
    marginTop: 20,
    justifyContent: "flex-start",
    alignContent: "space-around",
    alignSelf: "stretch",
    display: "none",
  },
  displayButtonHomeFlex: {
    flexDirection: "column",
    marginTop: 20,
    justifyContent: "flex-start",
    alignContent: "space-around",
    alignSelf: "stretch",
  },

  displayButton: {
    flexDirection: "column",
    marginTop: 20,
    justifyContent: "flex-start",
    alignContent: "space-around",
    alignSelf: "stretch",
  },
  update: {
    alignSelf: "stretch",
    paddingTop: 30,
  },
});
