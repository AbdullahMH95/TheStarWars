/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 * @lint-ignore-every XPLATJSCOPYRIGHT1
 */

import React, { Component } from "react";
import HomeStack from "./src/navigation";
import { Provider } from "react-redux";
import { store } from "./src/redux/store";

export default class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <HomeStack />
      </Provider>
    );
  }
}
