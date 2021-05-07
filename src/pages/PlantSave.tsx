import React, { useState } from "react";
import {
  StyleSheet,
  Alert,
  Image,
  ScrollView,
  TouchableOpacity,
  Platform,
  Text,
  View,
} from "react-native";
import { SvgFromUri } from "react-native-svg";
import { PlantProps, savePlant, loadPlant } from "../libs/storage";
import DateTimePicker, {
  Event,
} from "@react-native-community/datetimepicker";
import { useNavigation, useRoute } from "@react-navigation/core";
import waterDrop from "../assets/waterdrop.png";
import Button from "../components/Button";
import colors from "../styles/colors";
import fonts from "../styles/fonts";
import { format, isBefore } from "date-fns";
interface Params {
  plant: PlantProps;
}
const PlantSave = () => {
  const [selectedDateTime, setSelectedDateTime] = useState(
    new Date()
  );
  const navigation = useNavigation();
  const [showDatePicker, setShowDatePicker] = useState(false);
  const route = useRoute();

  const handleOpenDateTimePickerForAndroid = () => {
    setShowDatePicker((oldState) => !oldState);
  };
  const handleChangeTime = (
    event: Event,
    dateTime: Date | undefined
  ) => {
    if (Platform.OS === "android") {
      setShowDatePicker((oldState) => !oldState);
    }
    if (dateTime && isBefore(dateTime, new Date())) {
      setSelectedDateTime(new Date());
      return Alert.alert("Escolha uma hora no futuro! ⏰");
    }
    if (dateTime) {
      setSelectedDateTime(dateTime);
    }
  };
  const handleSave = async () => {
    try {
      await savePlant({
        ...plant,
        dateTimeNotification: selectedDateTime,
      });
      navigation.navigate("Confirmation", {
        title: "Tudo certo",
        subTitle:
          "Fique tranquilo que sempre vamos lembrar você de cuidar das suas plantinhas com muito cuidado.",
        buttonTitle: "Muito Obrigado :D",
        icon: "hug",
        nextScreen: "MyPlants",
      });
    } catch (error) {
      Alert.alert("Não foi possivel salvar.😰");
    }
  };

  const { plant } = route.params as Params;
  return (
    <View style={styles.container}>
      <View style={styles.plantInfo}>
        <SvgFromUri uri={plant.photo} width={150} height={150} />
        <Text style={styles.plantName}>{plant.name}</Text>
        <Text style={styles.plantAbout}>{plant.about}</Text>
      </View>
      <View style={styles.controller}>
        <View style={styles.tipContainer}>
          <Image style={styles.tipImage} source={waterDrop} />
          <Text style={styles.tipText}>{plant.water_tips}</Text>
        </View>

        <Text style={styles.alertLabel}>
          Escolha o melhor horário para ser lembrado:
        </Text>

        {showDatePicker && (
          <DateTimePicker
            value={selectedDateTime}
            mode="time"
            display="spinner"
            onChange={handleChangeTime}
          />
        )}

        {Platform.OS === "android" && (
          <TouchableOpacity
            style={styles.dateTimePickerButton}
            onPress={handleOpenDateTimePickerForAndroid}
          >
            <Text style={styles.dateTimePickerText}>
              {`Mudar ${format(selectedDateTime, "HH:mm")}`}
            </Text>
          </TouchableOpacity>
        )}

        <Button title="Cadastrar planta" onPress={handleSave} />
      </View>
    </View>
  );
};

export default PlantSave;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",

    backgroundColor: colors.shape,
  },
  plantInfo: {
    flex: 1,
    paddingHorizontal: 10,
    position: "relative",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.shape,
    paddingBottom: 40,
  },
  controller: {
    backgroundColor: colors.white,
    paddingHorizontal: 20,
    paddingBottom: 30,
  },
  plantName: {
    fontFamily: fonts.heading,
    fontSize: 24,
    color: colors.heading,
  },
  plantAbout: {
    textAlign: "center",
    fontFamily: fonts.text,
    color: colors.heading,
    fontSize: 17,
  },
  tipContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: colors.blue_light,
    padding: 10,
    borderRadius: 20,
    position: "relative",
    bottom: 40,
  },
  tipImage: {
    width: 56,
    height: 56,
  },
  tipText: {
    flex: 1,
    marginLeft: 20,
    fontFamily: fonts.text,
    color: colors.blue,
    fontSize: 17,
    lineHeight: 19,
    textAlign: "left",
  },
  alertLabel: {
    textAlign: "center",
    fontFamily: fonts.complement,
    color: colors.heading,
    fontSize: 12,
  },
  dateTimePickerButton: {
    width: "100%",
    alignItems: "center",
    paddingVertical: 20,
  },
  dateTimePickerText: {
    color: colors.heading,
    fontSize: 24,
    fontFamily: fonts.text,
  },
});
