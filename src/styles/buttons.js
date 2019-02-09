import React from "react";
import { Button } from "react-native-elements";
import Icon from "react-native-vector-icons/FontAwesome";
import colors from "../constants/colors";

export const CustomButton = props => {
  const {
    title,
    buttonColor,
    iconName,
    iconColor,
    color,
    onClick,
    width
  } = props;
  return (
    <Button
      {...props}
      buttonStyle={{
        borderColor: "black",
        marginVertical: 20,
        backgroundColor: buttonColor,
        opacity: 0.7,
        borderRadius: 10,
        width: width
      }}
      icon={
        <Icon
          style={{ marginRight: 10, opacity: 0.8 }}
          name={iconName}
          size={15}
          color={iconColor}
        />
      }
      type="outline"
      titleStyle={{ color: color }}
      title={title}
      onPress={onClick}
    />
  );
};
// Set default props
CustomButton.defaultProps = {
  buttonColor: colors.primaryButtonColor,
  width: 220
};
