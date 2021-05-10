import React from 'react';
import { View, StyleSheet } from 'react-native';
import Colors from '../config/Colors';

export interface Devider {
    size: number
}

export default function Devider({size}: Devider) {

    return (
        <View style={[styles.devider, {height: size}]}></View>
    )
} 

const styles = StyleSheet.create({
    devider: {
        width: '100%',
        backgroundColor: Colors.grey
    }
})