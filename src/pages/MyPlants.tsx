import React, { useEffect, useState } from "react";
import {
  Alert,
  FlatList,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import Header from "../components/Header";
import colors from "../styles/colors";
import {
  loadPlant,
  PlantProps,
  removePlant,
  StoragePlantProps,
} from "../libs/storage";
import waterDrop from "../assets/waterdrop.png";
import { formatDistance } from "date-fns";
import { pt } from "date-fns/locale";
import fonts from "../styles/fonts";
import PlantCardSecondary from "../components/PlantCardSecondary";
import Load from "../components/Load";
import AsyncStorage from "@react-native-async-storage/async-storage";
const MyPlants = () => {
  const [myPlants, setMyPlants] = useState<PlantProps[]>([]);
  const [loading, setLoading] = useState(true);
  const [nextWatered, setNextWatered] = useState<string>();

  const handleRemove = (plant: PlantProps) => {
    Alert.alert("Remover", `Deseja remover a ${plant.name}?`, [
      {
        text: "Não 🙏",
        style: "cancel",
      },
      {
        text: "Sim 😢",
        onPress: async () => {
          try {
            await removePlant(plant.id);
            setMyPlants((oldData) =>
              oldData.filter((item) => item.id !== plant.id)
            );
          } catch (error) {
            Alert.alert("Não foi possivel remover");
            console.log(error);
          }
        },
      },
    ]);
  };

  useEffect(() => {
    const loadStorageData = async () => {
      const plantsStoraged = await loadPlant();

      const nextTime = formatDistance(
        new Date(plantsStoraged[0].dateTimeNotification).getTime(),
        new Date().getTime(),
        { locale: pt }
      );

      setNextWatered(
        `Não esqueca de regar a ${plantsStoraged[0].name} daqui á ${nextTime}.`
      );
      setMyPlants(plantsStoraged);
      setLoading(false);
    };
    loadStorageData();
  }, []);

  if (loading) {
    return <Load />;
  }
  return (
    <ScrollView>
      <View style={styles.container}>
        <Header />

        <View style={styles.spotlight}>
          <Image style={styles.spotlightImage} source={waterDrop} />
          <Text style={styles.spotlightText}>{nextWatered}</Text>
        </View>

        <View style={styles.plants}>
          <Text style={styles.plantsTitle}>Próximas regadas</Text>

          <FlatList
            data={myPlants}
            keyExtractor={(item) => String(item.id)}
            renderItem={({ item }) => (
              <PlantCardSecondary
                handleRemove={() => {
                  handleRemove(item);
                }}
                data={item}
              />
            )}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ flex: 1 }}
          />
        </View>
      </View>
    </ScrollView>
  );
};

export default MyPlants;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 30,
    paddingTop: 50,
    backgroundColor: colors.background,
  },
  spotlight: {
    backgroundColor: colors.blue_light,
    paddingHorizontal: 20,
    borderRadius: 20,
    height: 110,
    flexDirection: "row",
    alignItems: "center",
  },
  spotlightImage: {
    width: 60,
    height: 60,
  },
  spotlightText: {
    flex: 1,
    color: colors.blue,
    paddingHorizontal: 20,
    textAlign: "justify",
  },
  plants: {
    flex: 1,
    width: "100%",
  },
  plantsTitle: {
    fontSize: 24,
    fontFamily: fonts.heading,
    color: colors.heading,
    marginVertical: 20,
  },
});
