import React from "react";
import { View, Button, StyleSheet } from "react-native";
import Colors from "../config/Colors";

export interface DetlaButtonProps {
  btnTitle: string;
  btnOnPress: () => void;
}

export default function DeltaButton({
  btnTitle,
  btnOnPress,
}: DetlaButtonProps) {
  return (
    <Button
      color={Colors.primary}
      onPress={() => btnOnPress()}
      title={btnTitle}
    ></Button>
  );
}
