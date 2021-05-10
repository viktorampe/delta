import React from "react";
import { TouchableOpacity, View, Text,Image, StyleSheet } from "react-native";
import PriceService from "../services/PriceService";

export interface ListCoin {
    id: string;
    name: string;
    code: string;
    priceInUSD: number;
    percentChange1h: number;
    onPress: () => void;
}

export default function ListCoin({id, name, code, priceInUSD, percentChange1h, onPress}: ListCoin) {

    return (
        <TouchableOpacity onPress={onPress} style={styles.coinContainer}>
            <View style={styles.coin}>
                <Image style={styles.coinIcon} source={{uri: `https://delta.app/images/${id}/icon-64.png`}} />
                <View style={styles.coinContent}>
                    <View style={styles.coinNameInfo}>
                        <Text style={styles.coinName}>{name}</Text>
                        <Text>{code}</Text>
                        <Text>$ {PriceService.round2Decimals(priceInUSD)}</Text>
                    </View>
                    <View style={styles.coinPriceInfo}>
                        <Text 
                            style={[
                                styles.coinPriceChange,
                                {color: PriceService.getPriceChangeColor(percentChange1h)}
                            ]}
                        >{PriceService.round2Decimals(percentChange1h)}</Text>
                    </View>
                </View>
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    coinContainer: {
        flex: 1,
        alignContent: 'center',
        alignItems: 'flex-start',
        borderBottomWidth: 1,
        borderBottomColor: '#F8F8F8',
    },
    coin: {
        paddingBottom: 20,
        paddingTop: 20,
        paddingLeft: 25,
        flex: 1,
        flexDirection: 'row',
        alignContent: 'center',
        alignItems: 'center',
    },
    coinIcon: {
        resizeMode: "cover",
        height: 24,
        width: 24
    },
    coinContent: {
        marginLeft: 20,
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    coinNameInfo: {
        alignSelf: 'flex-start',
    },
    coinPriceInfo: {
        alignSelf: 'flex-end',
        flex: 1,
        alignItems: 'flex-end',
        justifyContent: 'center',
        marginRight: 25,
    },
    coinName: {
        fontWeight: 'bold',
        fontSize: 16,
    },
    coinPriceChange: {
        fontSize: 18,
        fontWeight: 'bold'
    }
})