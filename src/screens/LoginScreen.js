import React, { Component } from "react";
import { View, StyleSheet, Image, Alert } from "react-native";
import { Input } from "react-native-elements";
import { CustomButton } from "../styles/buttons";
import api from "../utils/api";
import { auth } from "../constants/urls";

export default class LoginScreen extends Component {
  constructor(props) {
    super(props);
    // init state.
    this.state = {
      username: "",
      password: "",
      loading: false
    };

    // Bind this function.
    this.login = this.login.bind(this);
  }

  static navigationOptions = {
    header: null
  };

  render() {
    return (
      <View style={styles.container}>
        <Image
          source={require("../images/sw.png")}
          style={{
            width: 200,
            height: 100,
            resizeMode: "center",
            marginBottom: 20,
            opacity: 0.5
          }}
        />
        <Input
          containerStyle={styles.loginInput}
          autoCorrect={false}
          placeholder="Username"
          onChangeText={username => this.setState({ username })}
          value={this.state.username}
          leftIcon={{
            type: "font-awesome",
            name: "user",
            marginRight: 10
          }}
        />
        <Input
          containerStyle={styles.loginInput}
          placeholder="Password"
          onChangeText={password => this.setState({ password })}
          secureTextEntry={true}
          autoCorrect={false}
          value={this.state.password}
          leftIcon={{
            type: "font-awesome",
            name: "unlock-alt",
            marginRight: 10
          }}
        />
        <CustomButton
          title="Login"
          iconName="arrow-right"
          onClick={this.login}
          loading={this.state.loading}
          loadingProps={{ color: "black" }}
          disabled={this.state.loading}
        />
      </View>
    );
  }

  login = async () => {
    // Get the username & password from the state.
    const { username, password } = this.state;
    const loginModel = {
      username,
      password
    };

    if (!this.validate(loginModel)) {
      return;
    }

    this.setState({ loading: true });
    try {
      const { data } = await api.get(auth + username);
      const { count, results } = data;
      if (count > 0) {
        const person = results[0];
        if (person.birth_year == password && person.name == username) {
          console.log("-------Go To Search-------");
          this.setState({ username: "", password: "" });
          this.props.navigation.navigate("Search");
        } else {
          this.showError("Please enter valid username/password");
        }
      } else {
        this.showError("Can not find user with this username");
      }
    } catch (error) {
      this.showError(error);
      console.log("Catched Error: ", error);
    } finally {
      this.setState({ loading: false });
    }
  };

  validate = loginModel => {
    if (loginModel.username == "" || loginModel.password == "") return false;

    return true;
  };

  showError = error => {
    Alert.alert("Error", error, [{ text: "OK" }], { cancelable: false });
  };
}

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#ffebdd",
    flexDirection: "column"
  },
  loginInput: {
    marginBottom: 10,
    width: 300,
    opacity: 0.5
  },
  loginButton: {
    borderColor: "black",
    width: 260,
    marginVertical: 20,
    backgroundColor: "#fff6ed",
    opacity: 0.7,
    borderRadius: 10
  }
});
