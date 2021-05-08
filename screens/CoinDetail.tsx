import { RouteProp } from '@react-navigation/native';
import React, { useContext, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { RootStackParamList } from "../App";
import { CoinContext } from '../context/CoinsContext';
import Coin from '../models/Coin';
import { CoinContextType } from '../models/CoinContextType';


type CoinScreenRouteProp = RouteProp<RootStackParamList, 'Coin'>;
type Props = { route: CoinScreenRouteProp };

export default function CoinDetail({route}: Props) {

    const {coinId} = route.params;

    const {coins, setCoins} = useContext<CoinContextType>(CoinContext);
    const [coin, setCoin] = useState<Coin>();

    // use effect
    const c = coins.find(c => c.id === coinId);
    setCoin(c);
    
    return (
        <View style={styles.container}>
            <Text>{coin?.name}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
