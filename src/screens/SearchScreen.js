import React, { Component } from "react";
import { View, Text, SafeAreaView, StyleSheet, Alert } from "react-native";
import { Icon, SearchBar, Avatar } from "react-native-elements";
import api from "../utils/api";
import { search } from "../constants/urls";
import { FlatGrid } from "react-native-super-grid";

export default class SearchScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      allPlanets: [],
      sizes: [],
      planetName: "",
      loading: false
    };
  }

  static navigationOptions = ({ navigation }) => {
    return {
      title: "Planets",
      headerRight: (
        <Icon
          name="sign-out"
          type="font-awesome"
          color="black"
          containerStyle={{ paddingHorizontal: 10, opacity: 0.5 }}
          onPress={() => {
            Alert.alert(
              "Logout",
              "Are you sure you want to logout? Logging out will delete all planets",
              [
                {
                  text: "Cancel",
                  onPress: () => console.log("Cancel Pressed"),
                  style: "cancel"
                },
                { text: "Logout", onPress: () => navigation.navigate("Login") }
              ],
              { cancelable: false }
            );
          }}
        />
      )
    };
  };

  updateSearch = planetName => {
    this.setState({ planetName });
  };

  findPlanet = async () => {
    const { planetName, allPlanets, sizes } = this.state;
    this.setState({ loading: true });
    try {
      const { data } = await api.get(search + planetName);
      const { count, results } = data;
      var max = 300;
      if (count > 0) {
        const planet = results[0];
        if (allPlanets.length == 0) {
          allPlanets.push(planet);
          sizes.push(max);
        } else {
          if (!this.isExists(planet)) {
            allPlanets.push(planet);
            const base = max / allPlanets.length;
            allPlanets.sort(
              (a, b) => Number(b.population) - Number(a.population)
            );
            for (let index = 1; index < allPlanets.length; index++) {
              sizes.push(max - base);
              max = max - base;
            }
          }
        }
      }
    } catch (error) {
      console.log("Catched Error: ", error);
    } finally {
      this.setState({ loading: false });
    }
  };

  isExists = planet => {
    const { allPlanets } = this.state;

    for (var item of allPlanets) {
      if (item.name == planet.name) {
        return true;
      }
    }
    return false;
  };

  render() {
    const { planetName, loading, allPlanets } = this.state;

    if (allPlanets.length == 0) {
      return (
        <SafeAreaView style={styles.container}>
          <SearchBar
            placeholder="Find a planet..."
            onChangeText={this.updateSearch}
            returnKeyType={"search"}
            onSubmitEditing={this.findPlanet}
            value={planetName}
            showLoading={loading}
            autoCorrect={false}
          />
          <View
            style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
          >
            <Text> Try to get plantes from search bar 🌎👆 </Text>
          </View>
        </SafeAreaView>
      );
    }

    return (
      <SafeAreaView style={styles.container}>
        <SearchBar
          placeholder="Find a planet..."
          onChangeText={this.updateSearch}
          returnKeyType={"search"}
          onSubmitEditing={this.findPlanet}
          value={planetName}
          showLoading={loading}
          autoCorrect={false}
        />
        <FlatGrid
          style={styles.gridView}
          itemDimension={180}
          items={allPlanets}
          renderItem={({ item, index }) => this.renderItem(item, index)}
        />
      </SafeAreaView>
    );
  }

  renderItem = (item, index) => {
    const { sizes } = this.state;

    return (
      <View style={styles.itemContainer}>
        <Avatar
          size={sizes[index]}
          rounded
          title={item.name}
          onPress={() => this.viewDetail(item)}
          containerStyle={{ padding: 4, backgroundColor: "black" }}
          titleStyle={{ fontSize: sizes[index] / 4 }}
        />
      </View>
    );
  };

  viewDetail = planet => {
    return Alert.alert(
      `${planet.name} Info`,
      `Name: ${planet.name}.
        Rotation period: ${planet.rotation_period}.
        Orbital period: ${planet.orbital_period}.
        Diameter: ${planet.diameter}.
        Climate: ${planet.climate}.
        Gravity: ${planet.gravity}.
        Terrain: ${planet.terrain}.
        Surface_water: ${planet.surface_water}.`
    );
  };
}

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffebdd"
  },
  gridView: {
    marginTop: 1,
    flex: 1
  },
  itemContainer: {
    justifyContent: "center",
    alignItems: "center",
    padding: 20
  }
});
