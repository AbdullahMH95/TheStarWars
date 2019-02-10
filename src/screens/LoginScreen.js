import React, { Component } from "react";
import { View, StyleSheet, Image, Alert } from "react-native";
import { Input } from "react-native-elements";
import { CustomButton } from "../styles/buttons";
import { connect } from "react-redux";
import { login } from "../redux/actions/actions";

class LoginScreen extends Component {
  constructor(props) {
    super(props);
    // init state.
    this.state = {
      username: "",
      password: "",
      loading: false
    };
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
          onClick={this.loginButton}
          loading={this.props.user.loading}
          loadingProps={{ color: "black" }}
          disabled={this.props.user.loading}
        />
      </View>
    );
  }

  // Set onPress for login button
  loginButton = () => {
    const { username, password } = this.state;
    if (!this.validate(username, password)) {
      return;
    }
    this.props.login(username, password, this.props.navigation);
  };

  // return to init state
  componentWillReceiveProps() {
    this.setState({ username: "", password: "" });
  }

  // check for empty
  validate = (username, password) => {
    if (username == "" || password == "") return false;
    return true;
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

const mapStateToProps = state => ({
  user: state.user
});

export default connect(
  mapStateToProps,
  { login }
)(LoginScreen);
