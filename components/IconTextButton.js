import React from "react";
import {
    TouchableOpacity,
    Text
} from "react-native";
import { Ionicons } from 'react-native-vector-icons';
import { COLORS, FONTS, SIZES } from '../constants';

const IconTextButton = ({ label, icon, containerStyle, onPress}) =>{
    return (
        <TouchableOpacity
            style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
                height: 50,
                borderRadius: SIZES.radius,
                backgroundColor: COLORS.white,
                ...containerStyle
            }}
            onPress={onPress}
        >
            <Ionicons name={icon} size={20} />
            <Text 
                style={{
                    marginLeft: SIZES.base,
                    ...FONTS.h3
                }}
            >
                {label}
            </Text>
        </TouchableOpacity>
    )
}

export default IconTextButton;