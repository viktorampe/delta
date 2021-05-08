import { createContext } from "react";
import { CoinContextType } from "../models/CoinContextType";

export const CoinContext = createContext<CoinContextType | any>(null);