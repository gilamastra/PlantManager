import React from "react";
import { Animated, StyleSheet, Text, View } from "react-native";
import {
  RectButton,
  RectButtonProps,
  Swipeable,
} from "react-native-gesture-handler";
import colors from "../styles/colors";
import fonts from "../styles/fonts";
import { SvgFromUri } from "react-native-svg";
import { Feather } from "@expo/vector-icons";

interface PlantProps extends RectButtonProps {
  data: {
    name: string;
    photo: string;
    hour: string;
  };
  handleRemove: () => void;
}

const PlantCardSecondary = ({
  data,
  handleRemove,
  ...rest
}: PlantProps) => {
  return (
    <Swipeable
      overshootRight={false}
      leftThreshold={2}
      renderRightActions={() => (
        <Animated.View>
          <View>
            <RectButton
              style={styles.buttonRemove}
              onPress={handleRemove}
            >
              <Feather name="trash" size={37} color={colors.white} />
            </RectButton>
          </View>
        </Animated.View>
      )}
    >
      <RectButton {...rest} style={styles.container}>
        <SvgFromUri uri={data.photo} width={50} height={50} />

        <Text style={styles.title}>{data.name}</Text>

        <View style={styles.details}>
          <Text style={styles.timeLabel}>Regar às</Text>
          <Text style={styles.time}>{data.hour}</Text>
        </View>
      </RectButton>
    </Swipeable>
  );
};

export default PlantCardSecondary;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    paddingHorizontal: 10,
    paddingVertical: 25,
    borderRadius: 20,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.shape,
    marginVertical: 5,
  },
  title: {
    flex: 1,
    marginLeft: 10,
    fontFamily: fonts.heading,
    fontSize: 17,
    color: colors.heading,
  },
  details: {
    alignItems: "flex-end",
  },
  timeLabel: {
    fontSize: 16,
    fontFamily: fonts.text,
    color: colors.body_light,
  },
  time: {
    marginTop: 5,
    fontSize: 16,
    fontFamily: fonts.heading,
    color: colors.body_dark,
  },
  buttonRemove: {
    width: 120,
    height: 90,
    backgroundColor: colors.red,
    borderRadius: 20,
    marginTop: 15,
    position: "relative",
    right: 20,
    justifyContent: "center",
    paddingLeft: 15,
    alignItems: "center",
  },
});
