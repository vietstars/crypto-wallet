import React from "react";
import {
    View,
    Animated
} from "react-native";
import { COLORS, SIZES } from "../constants"
import { IconTextButton } from "../components"
import { useSelector } from "react-redux";

const MainLayout = ({children}) => {

    const { isTradeModalVisible } = useSelector(state => state.tabReducer);
    const modalAminatedValue = React.useRef(new Animated.Value(0)).current;

    React.useEffect(() => {
        if(isTradeModalVisible) {
            Animated.timing(modalAminatedValue, {
                toValue: 1,
                duration: 500,
                useNativeDriver: false
            }).start();
        } else {
            Animated.timing(modalAminatedValue, {
                toValue: 0,
                duration: 500,
                useNativeDriver: false
            }).start();
        }
    }, [isTradeModalVisible])

    const modalY = modalAminatedValue.interpolate({
        inputRange:[0,1],
        outputRange: [SIZES.height, SIZES.height - 218]
    })

    return (
        <View
            style={{
                flex: 1
            }}
        >
            {children}
            {/*Modal*/}
            <Animated.View
                style={{
                    position: "absolute",
                    left: 0,
                    top: modalY,
                    width: "100%",
                    padding: SIZES.padding,
                    backgroundColor: COLORS.primary
                }}
            >
                <IconTextButton 
                    label="Transfer" 
                    icon="ios-send" 
                    onPress={() => console.log("Transfer")}
                />
                <IconTextButton 
                    label="Withdraw" 
                    icon="ios-arrow-down-circle" 
                    containerStyle={{
                        marginTop: SIZES.base
                    }}
                    onPress={() => console.log("Withdraw")}
                />
            </Animated.View>
        </View>
    )
}

export default MainLayout;