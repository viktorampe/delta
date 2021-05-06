import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import CoinList from "./screens/CoinList";
import CoinDetail from "./screens/CoinDetail";

export type RootStackParamList = {
  Coins: undefined,
  Coin: { coinId: string }
}

const Stack = createStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Coins">
        <Stack.Screen name="Coins" component={CoinList} options={{title: 'Coins'}} />
        <Stack.Screen name="Coin" component={CoinDetail} options={{title: 'Your coin'}}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
