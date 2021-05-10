import { RouteProp } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import React, { useContext, useEffect, useState } from "react";
import { StyleSheet, Text, View, Image } from "react-native";
import { RootStackParamList } from "../App";
import DeltaButton from "../components/DeltaButton";
import Devider from "../components/Devider";
import Colors from "../config/Colors";
import { CoinContext } from "../context/CoinsContext";
import Coin from "../models/Coin";
import { CoinContextType } from "../models/CoinContextType";
import PriceService from "../services/PriceService";

type CoinScreenRouteProp = RouteProp<RootStackParamList, "Coin">;
type CoinListNavProps = StackNavigationProp<RootStackParamList, "Coin">;
type Props = { route: CoinScreenRouteProp; navigation: CoinListNavProps };

export default function CoinDetail({ route, navigation }: Props) {
  const { coinId } = route.params;

  const { coins } = useContext<CoinContextType>(CoinContext);

  const [coin, setCoin] = useState<Coin>();

  useEffect(() => {
    // set coin
    const c = coins.find((c) => c.id === coinId);
    setCoin(c);
    // set nav title
    navigation.setOptions({ title: c?.name });
  });

  return (
    <View style={styles.container}>
      <View style={styles.coinInfoWrapper}>
        <View style={styles.coinInfoTitle}>
          <Image
            style={styles.coinIcon}
            source={{ uri: `https://delta.app/images/${coin?.id}/icon-64.png` }}
          />
          <Text style={styles.coinInfoName}>{coin?.name}</Text>
        </View>
        <Text>({coin?.dirtyCode}) {coin?.code}</Text>
      </View>
      <Devider size={10}></Devider>
      <View style={styles.coinPriceWrapper}>
        <Text style={styles.title}>Price</Text>
        <Text style={styles.price}>$ {PriceService.round2Decimals(coin?.priceInUSD)}</Text>
      </View>
      <Devider size={10}></Devider>
      <View style={styles.coinPriceChangeWrapper}>
        <View style={styles.coinPriceChangeSection}>
          <Text style={styles.subtitle}>1h: </Text>
          <Text style={{ color: PriceService.getPriceChangeColor(coin?.percentChange1h), }} >
            {PriceService.round2Decimals(coin?.percentChange1h)}
          </Text>
        </View>
        <View style={styles.coinPriceChangeSection}>
          <Text style={styles.subtitle}>24h: </Text>
          <Text style={{ color: PriceService.getPriceChangeColor(coin?.percentChange24h), }} >
            {PriceService.round2Decimals(coin?.percentChange24h)}
          </Text>
        </View>
        <View style={styles.coinPriceChangeSection}>
          <Text style={styles.subtitle}>7d: </Text>
          <Text style={{ color: PriceService.getPriceChangeColor(coin?.percentChange7d), }} >
            {PriceService.round2Decimals(coin?.percentChange7d)}
          </Text>
        </View>
      </View>
      <Devider size={1}></Devider>
      <View style={styles.coinMarketCapWrapper}>
        <View style={[styles.coinMarketCapSection, {alignItems: 'flex-end'}]}>
          <Text style={styles.subtitle}>Market Cap: </Text>
          <Text>$ {PriceService.round2Decimals(coin?.marketCapInUSD)}</Text>
        </View>
        <View style={[styles.coinMarketCapSection, , {alignItems: 'flex-start'}]}>
          <Text style={styles.subtitle}>Rank: </Text>
          <Text>{coin?.marketCapRank}</Text>
        </View>
      </View>
      <Devider size={1}></Devider>
      <View style={styles.coinSupplyWrapper}>
        <View style={[styles.coinSupplySection, , {alignItems: 'flex-end'}]}>
          <Text style={styles.subtitle}>Total Supply: </Text>
          <Text>{coin?.totalSupply}</Text>
        </View>
        <View style={[styles.coinSupplySection, , {alignItems: 'flex-start'}]}>
          <Text style={styles.subtitle}>Available Supply: </Text>
          <Text>{coin?.availableSupply}</Text>
        </View>
      </View>
      <Devider size={1}></Devider>
      <View style={styles.coinActionsWrapper}>
        <View style={styles.coinAction}>
          <DeltaButton
            btnTitle="Buy"
            btnOnPress={() => {
              console.log("not yet implemented");
            }}
          ></DeltaButton>
        </View>
        <View>
          <DeltaButton
            btnTitle="Sell"
            btnOnPress={() => {
              console.log("not yet implemented");
            }}
          ></DeltaButton>
        </View>
      </View>
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

  title: {
    fontSize: 20,
    fontWeight: "bold",
  },

  subtitle: {
    fontSize: 15,
    fontWeight: "bold",
  },

  // CoinInfo
  coinInfoWrapper: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    width: "75%",
  },
  coinInfoTitle: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
  },
  coinInfoName: {
    fontSize: 28,
    fontWeight: "bold",
    marginLeft: 15
  },
  coinIcon: {
    resizeMode: "cover",
    height: 24,
    width: 24,
  },

  // CoinPrice
  coinPriceWrapper: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: "75%",
  },
  price: {
    fontWeight: 'bold',
    fontSize: 25,
    color: Colors.green
  },

  // CoinPriceChange
  coinPriceChangeWrapper: {
    flex: 1,
    flexDirection: 'row',
    width: "75%",
    alignItems: 'center'
  },
  coinPriceChangeSection: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },

  // CoinMarketCap
  coinMarketCapWrapper: {
    flex: 1,
    justifyContent: "center",
    width: "75%",
  },
  coinMarketCapSection: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  // CoinSupply
  coinSupplyWrapper: {
    flex: 1,
    justifyContent: "center",
    width: "75%",
  },
  coinSupplySection: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },


  // CoinAction
  coinActionsWrapper: {
    flex: 1,
    width: "75%",
    justifyContent: 'center'
  },
  coinAction: {
    marginBottom: 5,
    marginTop: 5,
  }
});
