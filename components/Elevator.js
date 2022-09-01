import { Button, StyleSheet, Text, View, Image } from "react-native";
import * as React from "react";
import { useState, useEffect } from "react";
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
} from "native-base";
// import { NavigationContainer } from "@react-navigation/native";
// import { createNativeStackNavigator } from "@react-navigation/native-stack";

// to change the choosen elevator status
const getElevatorData = async (elevatorID, setElevatorData) => {
  try {
    const res = await axios.get(
      `https://7af9-2001-56b-bc6d-7400-80f7-de5a-e35b-8fc.ngrok.io/api/Elevators/${elevatorID}`
    );
    console.log("infos about elevator:", res.data);
    setElevatorData(res.data);
  } catch (err) {
    console.warn("[getElevatorData] Error:", err);
  }
};

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
    status: "Test",
  },
];

export default function ElevatorScreen({ navigation, route }) {
  const [elevatorData, setElevatorData] = useState({});
  const { elevatorID } = route.params;
  console.log("the id is", elevatorID);
  useEffect(() => {
    getElevatorData(elevatorID, setElevatorData);
    console.log("elevator data is111:", elevatorData);
  }, []);

  useEffect(() => {
    console.log("elevator data is:", elevatorData);
  }, [elevatorData]);

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
      {/* <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}> */}
      <Image style={styles.logo} source={require("../assets/R2.png")} />
      <Text>
        {/* Information displayed about Elevator * */}
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
            <Box>
              {/* <AspectRatio w="100%" ratio={16 / 9}>
                  <Image
                    style={styles.logo}
                    source={require("../assets/R2.png")}
                    // source={{
                    //   uri: "https://www.holidify.com/images/cmsuploads/compressed/Bangalore_citycover_20190613234056.jpg",
                    // }}
                    alt="image"
                  />
                </AspectRatio> */}
            </Box>
            <Stack p="4" space={3}>
              <Stack space={2}>
                <Heading size="md" ml="-1" textAlign={"center"}>
                  Your choosen Elevator :
                </Heading>
                <Text
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
                <Text
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
                  Last inspection date : {elevatorData.last_inspection_date}
                </Text>
                <Text
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
                  Serial number : {elevatorData.elevator_type}
                </Text>
              </Stack>

              <HStack
                alignItems="center"
                space={4}
                justifyContent="space-between"
              >
                <HStack alignItems="center">
                  <Text
                    color="coolGray.600"
                    _dark={{
                      color: "warmGray.200",
                    }}
                    fontWeight="400"
                  >
                    Elevator status : {elevatorData.status}
                  </Text>
                </HStack>
              </HStack>
            </Stack>
          </Box>
        </Box>
      </Text>

      <Button
        title="Update Status"
        onPress={() => navigation.navigate("Home")}
      />
      <Button
        title="Back to Home"
        onPress={() => navigation.navigate("Home")}
      />
      {/* <Button title="Elevator call" onPress={() => getElevatorData()} /> */}
      {/* </View> */}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
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
    height: 75,
    resizeMode: "contain",
    marginBottom: 5,
    marginTop: 35,
  },
});
