import Coin from "./Coin";

export interface CoinContextType {
    coins: Coin[];
    setCoins: (coins: Coin[]) => void;
}