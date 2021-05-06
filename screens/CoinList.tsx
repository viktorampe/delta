import { StackNavigationProp } from '@react-navigation/stack';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { RootStackParamList } from '../App';


type CoinListNavProps = StackNavigationProp<RootStackParamList, 'Coin'>;
type Props = { navigation: CoinListNavProps; };

export default function CoinList({navigation}: Props) {
  return (
    <View style={styles.container}>
      <Text onPress={() => navigation.navigate('Coin', { coinId: 'x'})} >Coinlist comes here!</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
