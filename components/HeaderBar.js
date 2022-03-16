import React from 'react';
import {
    View,
    Text
} from 'react-native';
import { COLORS, SIZES, FONTS } from "../constants";

const HeaderBar = ({title, containerStyle}) => {
    return (
        <View
            style={{
                height: 100,
                justifyContent: 'flex-end',
                ...containerStyle
            }}
        >
            <Text
                style={{
                    ...FONTS.largeTitle,
                    color: COLORS.white,
                }}
            >
                {title}
            </Text>
        </View>
    )
}

export default HeaderBar;