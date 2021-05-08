export default interface Coin {
    id: string;
    name: number;
    code: string;
    dirtyCode: string;
    priceInUSD: number;
    availableSupply: number;
    marketCapInUSD: number;
    marketCapRank: number;
    percentChange1h: number;
    percentChange24h: number;
    percentChange7d: number;
    slug: string;
    totalSupply: number;
    volume24hInUSD: number;
}