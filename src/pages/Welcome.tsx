import React from "react";
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import watering from "../assets/watering.png";
import colors from "../styles/colors";
import { Entypo } from "@expo/vector-icons";
import fonts from "../styles/fonts";
import { useNavigation } from "@react-navigation/core";
import UserIdentification from "./UserIdentification";

const Welcome = () => {
  const navigation = useNavigation();
  const handleStart = () => {
    navigation.navigate("UserIdentification");
  };
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.wrapper}>
        <Text style={styles.title}>
          Gerencie {"\n"} suas plantas de {"\n"} forma fácil
        </Text>

        <Image
          style={styles.image}
          source={watering}
          resizeMode="contain"
        />

        <Text style={styles.subTitle}>
          Não esqueca mais de regar suas plantas. Nós cuidamos de
          lembrar você sempre que precisar.
        </Text>

        <TouchableOpacity
          style={styles.button}
          activeOpacity={0.7}
          onPress={handleStart}
        >
          <Entypo style={styles.buttonIcon} name="chevron-right" />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};
export default Welcome;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50,
  },
  wrapper: {
    alignItems: "center",
    flex: 1,
    justifyContent: "space-around",
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 28,
    textAlign: "center",
    color: colors.heading,
    fontFamily: fonts.heading,
    lineHeight: 34,
  },
  subTitle: {
    textAlign: "center",
    fontSize: 18,
    color: colors.heading,
    fontFamily: fonts.text,
  },
  button: {
    backgroundColor: colors.green,
    borderRadius: 16,
    marginBottom: 10,
    height: 56,
    justifyContent: "center",
    alignItems: "center",
    width: 56,
  },
  buttonIcon: {
    color: colors.white,
    fontSize: 32,
  },
  image: {
    height: Dimensions.get("window").width * 0.7,
  },
});
