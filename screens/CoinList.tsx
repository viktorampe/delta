import axios from 'axios';

import React, { useContext, useEffect, useState } from 'react';
import { StackNavigationProp } from '@react-navigation/stack';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

import { RootStackParamList } from '../App';
import { CoinContext } from '../context/CoinsContext';
import Coin from '../models/Coin';
import DeltaButton from '../components/DeltaButton';
import Apiconfig from '../config/Apiconfig';

type CoinListNavProps = StackNavigationProp<RootStackParamList, 'Coin'>;
type Props = { navigation: CoinListNavProps; };

export default function CoinList({navigation}: Props) {

  const {coins, setCoins} = useContext(CoinContext);
  const [pageNumber, setPageNumber] = useState(1);
  const [isLoading, setisLoading] = useState(true);

  const LAST_PAGE = Math.ceil(Apiconfig.TOTAL_COINS / Apiconfig.PAGE_SIZE);

  useEffect(() => {
    (async () => {
      await fetchCoins();
    })();
  }, [pageNumber]) // only run effect when pageNumber updates

    
  const fetchCoins = async () => {
    try {
      // fetch
      const response = await axios(`${Apiconfig.DELTA_API_URL}?page%5Bnumber%5D=${pageNumber}&page%5Bsize%5D=${Apiconfig.PAGE_SIZE}`);
      // set coins
      setCoins((prevCoins: Coin[]) => {
        if (prevCoins.length) { return [...prevCoins, ...response.data.data]; }
        return response.data.data;
      });
    } catch (err) { console.log(err.message); }
    finally { setisLoading(false); }
  }

  const incrementPage = () => {
    if (pageNumber < LAST_PAGE) { setPageNumber(pageNumber + 1); }
  }
  
  const renderLoadMoreBtn = () => {
    if (pageNumber <= LAST_PAGE) {
      return (
        <DeltaButton
          btnTitle="Load more"
          btnOnPress={incrementPage}
        ></DeltaButton> 
      )
    }
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
      <View style={styles.coinList}>
        <Text>Coins: {coins.length}</Text>
        <FlatList
          data={coins}
          renderItem={renderCoin}
          keyExtractor={coin => `${coin.id}`}
        /> 
        {renderLoadMoreBtn()}      
      </View>
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
    flex: 1,
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
