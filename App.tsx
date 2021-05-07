import React, { Fragment, useEffect } from "react";
import * as Notifications from "expo-notifications";
import { View, Text, StyleSheet, SafeAreaView } from "react-native";
import Routes from "./src/routes";
import AppLoading from "expo-app-loading";
import {
  useFonts,
  Jost_400Regular,
  Jost_600SemiBold,
} from "@expo-google-fonts/jost";
import { PlantProps } from "./src/libs/storage";

const App = () => {
  const [fontsLoaded] = useFonts({
    Jost_400Regular,
    Jost_600SemiBold,
  });

  if (!fontsLoaded) return <AppLoading />;

  return <Routes />;
};
export default App;
