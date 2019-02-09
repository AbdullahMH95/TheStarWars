import { createStackNavigator, createAppContainer } from "react-navigation";
import LoginScreen from "./screens/LoginScreen";
import SearchScreen from "./screens/SearchScreen";

const HomeStack = createStackNavigator(
  {
    Login: LoginScreen,
    Search: SearchScreen
  },
  {
    initialRouteName: "Login",
    defaultNavigationOptions: {
      headerLeft: null
    }
  }
);

export default createAppContainer(HomeStack);
