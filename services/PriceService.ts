import Colors from "../config/Colors";

export default class PriceService {

    public static round2Decimals(priceInUSD: number | undefined): number  {
        if (!priceInUSD) { return 0; }
        return Math.round(priceInUSD * 100) / 100;
    }
    
    public static getPriceChangeColor(priceChange: number | undefined): string {
        if (!priceChange) { return '#000000'; }
        if (Math.sign(priceChange) === -1) { return Colors.red; }
        if (Math.sign(priceChange) === 0) { return Colors.primary; }
        return Colors.green;
    }

}