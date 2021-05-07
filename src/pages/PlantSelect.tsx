import React, { useEffect, useState } from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  View,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import EnviromentButton from "../components/EnviromentButton";
import Header from "../components/Header";
import PlantCardPrimary from "../components/PlantCardPrimary";
import api from "../services/api";
import colors from "../styles/colors";
import fonts from "../styles/fonts";
import Load from "../components/Load";
import { useNavigation } from "@react-navigation/core";
import { PlantProps } from "../libs/storage";

interface EnvironmentProps {
  key: string;
  title: string;
}

const PlantSelect = () => {
  const [environments, setEnviroments] = useState<EnvironmentProps[]>(
    []
  );
  const [plants, setPlants] = useState<PlantProps[]>([]);
  const [filteredPlants, setFilteredPlants] = useState<PlantProps[]>(
    []
  );
  const [environmentsSelected, setEnvironmentsSelected] = useState(
    "all"
  );
  const [isLoading, setIsLoading] = useState(true);

  const [page, setPage] = useState(1);
  const [loadingMore, setLoadingMore] = useState(false);
  const handleEnvironmentSelected = (environment: string) => {
    setEnvironmentsSelected(environment);

    if (environment === "all") {
      return setFilteredPlants(plants);
    }
    const filtered = plants.filter((plant) =>
      plant.environments.includes(environment)
    );

    setFilteredPlants(filtered);
  };
  const navigation = useNavigation();

  useEffect(() => {
    const fetchEnvironment = async () => {
      const { data } = await api.get(
        "plants_environments?_sort=title&order=asc "
      );

      setEnviroments([
        {
          key: "all",
          title: "Todos",
        },
        ...data,
      ]);
    };
    fetchEnvironment();
  }, []);
  const fetchPlants = async () => {
    const { data } = await api.get(
      `plants?_sort=name&order=asc&_page=${page}&_limit=8 `
    );
    if (!data) return setIsLoading(true);

    if (page > 1) {
      setPlants((oldValue) => [...oldValue, ...data]);
      setFilteredPlants((oldValue) => [...oldValue, ...data]);
    } else {
      setPlants(data);
      setFilteredPlants(data);
    }
    setIsLoading(false);
    setLoadingMore(false);
  };

  useEffect(() => {
    fetchPlants();
  }, []);

  const handleFetchMore = (distance: number) => {
    if (distance < 1) return;

    setLoadingMore(true);
    setPage((oldValue) => oldValue + 1);
    fetchPlants();
  };

  const handlePlantSelect = (plant: PlantProps) => {
    navigation.navigate("PlantSave", { plant });
  };

  if (isLoading) {
    return <Load />;
  } else
    return (
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.container}
      >
        <View style={styles.container}>
          <View style={styles.header}>
            <Header />
            <Text style={styles.title}>Em qual ambiente</Text>
            <Text style={styles.subTitle}>
              você quer colocar sua planta?
            </Text>
          </View>

          <View>
            <FlatList
              data={environments}
              keyExtractor={(item) => String(item.key)}
              renderItem={({ item }) => (
                <EnviromentButton
                  title={item.title}
                  active={item.key === environmentsSelected}
                  onPress={() => handleEnvironmentSelected(item.key)}
                />
              )}
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.enviromentList}
            />
          </View>

          <View style={styles.plants}>
            <FlatList
              keyExtractor={(item) => String(item.id)}
              data={filteredPlants}
              renderItem={({ item }) => {
                return (
                  <PlantCardPrimary
                    onPress={() => handlePlantSelect(item)}
                    data={item}
                  />
                );
              }}
              showsVerticalScrollIndicator={false}
              numColumns={2}
              contentContainerStyle={styles.contentContainerStyle}
              onEndReachedThreshold={0.1}
              onEndReached={({ distanceFromEnd }) =>
                handleFetchMore(distanceFromEnd)
              }
              ListFooterComponent={
                loadingMore ? (
                  <ActivityIndicator color={colors.green} />
                ) : (
                  <></>
                )
              }
            />
          </View>
        </View>
      </ScrollView>
    );
};

export default PlantSelect;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    paddingHorizontal: 30,
    marginTop: 30,
  },
  title: {
    fontSize: 17,
    color: colors.heading,
    fontFamily: fonts.heading,
    lineHeight: 20,
    marginTop: 15,
  },
  subTitle: {
    fontFamily: fonts.text,
    fontSize: 17,
    lineHeight: 20,
    color: colors.heading,
  },
  enviromentList: {
    height: 40,
    justifyContent: "center",
    paddingBottom: 5,
    marginLeft: 32,
    marginVertical: 32,
  },
  plants: {
    flex: 1,
    paddingHorizontal: 32,
    justifyContent: "center",
  },
  contentContainerStyle: {
    justifyContent: "center",
  },
});
