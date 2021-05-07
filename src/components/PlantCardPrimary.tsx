import React from "react";
import { StyleSheet, Text, View } from "react-native";
import {
  RectButton,
  RectButtonProps,
} from "react-native-gesture-handler";
import colors from "../styles/colors";
import fonts from "../styles/fonts";
import { SvgFromUri } from "react-native-svg";

interface PlantProps extends RectButtonProps {
  data: {
    name: string;
    photo: string;
  };
}
const PlantCardPrimary = ({ data, ...rest }: PlantProps) => {
  return (
    <RectButton {...rest} style={styles.container}>
      <SvgFromUri uri={data.photo} width={70} height={70} />
      <Text style={styles.text}>{data.name}</Text>
    </RectButton>
  );
};

export default PlantCardPrimary;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    maxWidth: "45%",
    backgroundColor: colors.shape,
    borderRadius: 20,
    paddingVertical: 10,
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 10,
    marginHorizontal: 8,
  },
  text: {
    color: colors.green_dark,
    fontFamily: fonts.heading,

    marginVertical: 16,
  },
});
