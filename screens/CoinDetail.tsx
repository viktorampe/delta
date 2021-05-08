import { RouteProp } from '@react-navigation/native';
import React, { useContext, useEffect, useState } from "react";
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

    useEffect(() => {
        const c = coins.find(c => c.id === coinId);
        setCoin(c);
    })
    
    return (
        <View style={styles.container}>
            <Text>{coin?.name}</Text>
            <Text>{coin?.code}</Text>
            <Text>{coin?.dirtyCode}</Text>
            <Text>{coin?.priceInUSD}</Text>
            <Text>{coin?.marketCapInUSD}</Text>
            <Text>{coin?.marketCapRank}</Text>
            <Text>{coin?.percentChange1h}</Text>
            <Text>{coin?.percentChange24h}</Text>
            <Text>{coin?.percentChange7d}</Text>
            <Text>{coin?.slug}</Text>
            <Text>{coin?.availableSupply}</Text>
            <Text>{coin?.totalSupply}</Text>
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
