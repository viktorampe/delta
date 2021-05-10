import React from "react";
import { Image, StyleSheet } from "react-native";

export default function Spinner() {
    return (
        <Image
            style={styles.spinner}
            source={require('../assets/spinnerGIF.gif')}
        ></Image>
    );
}

const styles = StyleSheet.create({
    spinner: {
        width: 30,
        height: 30
    }
})

