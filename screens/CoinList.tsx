import axios from 'axios';

import React, { useContext, useEffect, useState } from 'react';
import { StackNavigationProp } from '@react-navigation/stack';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

import { RootStackParamList } from '../App';
import { CoinContext } from '../context/CoinsContext';
import Coin from '../models/Coin';

type CoinListNavProps = StackNavigationProp<RootStackParamList, 'Coin'>;
type Props = { navigation: CoinListNavProps; };

export default function CoinList({navigation}: Props) {

  const PAGE_SIZE = 15;

  const {coins, setCoins} = useContext(CoinContext);
  const [pageNumber, setPageNumber] = useState(1);
  const [isLoading, setisLoading] = useState(true);

  useEffect(() => {
    (async () => {
      await fetchCoins();
    })();
  }, [pageNumber]) // only run effect when pageNumber updates

    
  const fetchCoins = async () => {
    try {
      const response = await axios(`https://api.getdelta.io/web/coins?page%5Bnumber%5D=${pageNumber}&page%5Bsize%5D=${PAGE_SIZE}`);
      console.log(response.data)
      setCoins(response.data.data);
    } catch (err) { console.log(err.message); }
    finally { setisLoading(false); }
  }
  const renderCoin = ({item}: {item: Coin}) => {
    return (
      <TouchableOpacity style={styles.coin}
        onPress={() => navigation.navigate('Coin', { coinId: item.id})}>
        <Text>{item.name}</Text>
        <Text>{item.code}</Text>
        <Text>{item.priceInUSD}</Text>
        <Text>{item.percentChange1h}</Text>
      </TouchableOpacity>
    )
  }

  const renderCoinList = () => {
    return (
      <FlatList style={styles.coinList}
        data={coins}
        renderItem={renderCoin}
        keyExtractor={coin => `${coin.id}`}
      />
    )
  }

  const renderSpinner = () => {
    return (
      <Text>Spinner here</Text>
    )
  }
  
  const showCoinList = () => {
    if (!isLoading) { return renderCoinList(); } 
    else { return renderSpinner(); }
  }

  return (
    <View style={styles.container}>
      {showCoinList()}
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
  coinList: {
    marginTop: 50,
    marginBottom: 50,
    width: '90%',
  },
  coin: {
    width: '100%',
    borderRadius: 10,
    borderWidth: 1,
    padding: 10,
    marginBottom: 5
  }
});
