import * as React from 'react';
import { useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import CoinList from "./screens/CoinList";
import CoinDetail from "./screens/CoinDetail";
import { CoinContext } from "./context/CoinsContext";
import Coin from "./models/Coin";

export type RootStackParamList = {
  Coins: undefined,
  Coin: { coinId: string }
}

const Stack = createStackNavigator();

function App() {

  const [coins, setCoins] = useState<Coin[]>([]);

  return (
    <CoinContext.Provider value={{coins, setCoins}}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Coins">
          <Stack.Screen name="Coins" component={CoinList} options={{title: 'Coins'}} />
          <Stack.Screen name="Coin" component={CoinDetail} options={{title: 'Your coin'}}/>
        </Stack.Navigator>
      </NavigationContainer>
    </CoinContext.Provider>
  );
}

export default App;


// TODO: api call url as constant
// TODO: Default values
// TODO: styles in seperate file
// 