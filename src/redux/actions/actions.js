import { baseURL, auth } from "../../constants/urls";
import axios from "axios";
import { Alert } from "react-native";

export const login = (username, password, navigation) => {
  return dispatch => {
    dispatch({ type: "GET_USER_PREPARE" });
    const url = baseURL + auth + username;
    axios
      .get(url)
      .then(response => {
        const { data } = response;
        const { count, results } = data;
        if (count > 0) {
          const person = results[0];
          if (person.birth_year == password && person.name == username) {
            console.log("-------Go To Search-------");
            dispatch({ type: "GET_USER_SUCCCESS", payload: person });
            navigation.navigate("Search");
          } else {
            dispatch({ type: "GET_USER_FAILED" });
            this.showError("Please enter valid username/password");
          }
        } else {
          dispatch({ type: "GET_USER_FAILED" });
          this.showError("Can not find user with this username");
        }
      })
      .catch(err => {
        dispatch({ type: "GET_USER_FAILED" });
        this.showError("Network error: ", err);
      });
  };
};

// simple alert for errors
showError = error => {
  Alert.alert("Error", error, [{ text: "OK" }], { cancelable: false });
};
