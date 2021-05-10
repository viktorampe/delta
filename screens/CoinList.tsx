import axios from 'axios';

import React, { useContext, useEffect, useState } from 'react';
import { StackNavigationProp } from '@react-navigation/stack';
import { FlatList, StyleSheet, View } from 'react-native';

import { RootStackParamList } from '../App';
import { CoinContext } from '../context/CoinsContext';
import Coin from '../models/Coin';
import DeltaButton from '../components/DeltaButton';
import Apiconfig from '../config/Apiconfig';
import ListCoin from '../components/ListCoin';
import Spinner from '../components/Spinner';

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
        // first fetch
        if (!prevCoins) { return response.data.data; }
        // add response to coins
        return [...prevCoins, ...response.data.data];
      });
    } catch (err) { console.log(err.message); }
    finally { setisLoading(false); }
  }

  const incrementPage = () => {
    if (pageNumber < LAST_PAGE) { setPageNumber(pageNumber + 1); }
  }

  const renderCoin = ({item}: {item: Coin}) => {
    return (
      <ListCoin
        onPress={() => navigation.navigate('Coin', { coinId: item.id})}
        id={item.id}
        name={item.name}
        code={item.code}
        priceInUSD={item.priceInUSD}
        percentChange1h={item.percentChange1h}
      ></ListCoin>
    )
  }

  const renderCoinList = () => {
    return (
      <View style={styles.coinList}>
        <FlatList
          data={coins}
          renderItem={renderCoin}
          keyExtractor={coin => `${coin.id}`}
          onEndReached={incrementPage}
          refreshing={isLoading}
        />     
      </View>
    )
  }
  
  const showCoinList = () => {
    if (!isLoading) { return renderCoinList(); } 
    else { return <Spinner></Spinner> }
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
    width: '100%',
  }
});
