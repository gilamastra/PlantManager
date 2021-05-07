import React, { useEffect, useState } from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import colors from "../styles/colors";
import img from "../assets/watering.png";
import fonts from "../styles/fonts";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Header = () => {
  const [userName, setUserName] = useState<string>();

  useEffect(() => {
    const loadStorageUsername = async () => {
      const user = await AsyncStorage.getItem("@plantmanager:user");
      setUserName(user || "");
    };
    loadStorageUsername();
  }, []);

  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.greeting}>Olá</Text>
        <Text style={styles.userName}>{userName}</Text>
      </View>
      <Image style={styles.userImage} source={img} />
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 20,
  },
  userImage: {
    width: 70,
    height: 70,
    borderRadius: 100,
  },
  greeting: {
    fontSize: 32,
    color: colors.heading,
    fontFamily: fonts.text,
  },
  userName: {
    fontSize: 32,
    fontFamily: fonts.heading,
    color: colors.heading,
    lineHeight: 40,
  },
});
