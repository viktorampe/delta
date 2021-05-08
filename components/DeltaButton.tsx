import React from 'react';
import { View, Button } from 'react-native';

export interface DetlaButtonProps {
    btnTitle: string;
    btnOnPress: () => void;
}

export default function DeltaButton({btnTitle, btnOnPress}: DetlaButtonProps) {

    return (
        <View>
            <Button
                onPress={() => btnOnPress()}
                title={btnTitle}
            ></Button>
        </View>
    )
} 