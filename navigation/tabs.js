import React from "react"
import {
    TouchableOpacity,
    View,
    Text
} from "react-native"
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useSelector, useDispatch } from 'react-redux';
import { setTradeModelVisibility } from '../stores/tab/tabAction';

import { Home, Portfolio, Market, Profile } from '../screens';
import { Ionicons } from 'react-native-vector-icons';
import { COLORS, FONTS } from '../constants';

const Tab = createBottomTabNavigator()

const TabBarCustomButton = ({children, onPress}) => {

    return (
        <TouchableOpacity
            style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center'
            }}
            onPress={onPress}
        >
            {children}
        </TouchableOpacity>
    );
}

const Tabs = () => {

    const { isTradeModalVisible } = useSelector(state => state.tabReducer);
    const dispatch = useDispatch();

    return (
        <Tab.Navigator
            screenOptions={{
                tabBarStyle: {
                    // height: 65,
                    backgroundColor: COLORS.primary,
                    borderTopColor: "transparent",
                },
                tabBarShowLabel: false,
                headerShown: false,
                tabBarInactiveTintColor: COLORS.secondary,
                tabBarActiveTintColor: COLORS.white
            }}
        >
            <Tab.Screen
                name="Home"
                component={Home} 
                options={{
                    tabBarIcon: ({color, size}) => {
                        if (!isTradeModalVisible) {
                            return (
                                <Ionicons name="home-outline" color={color} size={size} />
                            )
                        }
                    }
                }}
                listeners={{
                    tabPress: e => {
                        if (isTradeModalVisible) {
                            e.preventDefault()
                        }
                    }
                }}
            />
            <Tab.Screen
                name="Portfolio"
                component={Portfolio}
                options={{
                    // tabBarBadge: 3,
                    // tabBarBadgeStyle: {backgroundColor: COLORS.brown, fontSize: 8, lineHeight: 12, marginTop: 10},
                    tabBarIcon: ({color, size}) => {
                        if (!isTradeModalVisible) {
                            return (
                                <Ionicons name="briefcase-outline" color={color} size={size} />
                            )
                        }
                    }
                }}
                listeners={{
                    tabPress: e => {
                        if (isTradeModalVisible) {
                            e.preventDefault()
                        }
                    }
                }}
            />
            <Tab.Screen
                name="Trade"
                component={Home}
                options={{
                    tabBarIcon: ({focused, color, size}) => {
                        return (
                            <View
                                style={{
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    width: 60,
                                    height: 60,
                                    borderRadius: 30,
                                    backgroundColor: COLORS.secondary,
                                    borderWidth: 1,
                                    borderColor: "thistle",
                                }}
                            >
                                <Ionicons name={isTradeModalVisible ? 'ios-close' : 'swap-vertical'} color={COLORS.white} size={size} />
                                <Text style={{ color: COLORS.white, ...FONTS.h5 }} > Trade </Text>
                            </View>
                        )
                    },
                    tabBarButton: (props) => {
                        return(
                            <TabBarCustomButton
                                {...props}
                                onPress={() => dispatch(setTradeModelVisibility(!isTradeModalVisible))}
                            />
                        )
                    }
                }}
            />
            <Tab.Screen
                name="Market"
                component={Market}
                options={{
                    tabBarIcon: ({color, size}) => {
                        if (!isTradeModalVisible) {
                            return (
                                <Ionicons name="pulse" color={color} size={size} />
                            )
                        }
                    }
                }}
                listeners={{
                    tabPress: e => {
                        if (isTradeModalVisible) {
                            e.preventDefault()
                        }
                    }
                }}
            />
            <Tab.Screen
                name="Profile"
                component={Profile}
                options={{
                    tabBarIcon: ({color, size}) => {
                        if (!isTradeModalVisible) {
                            return (
                                <Ionicons name="person-outline" color={color} size={size} />
                            )
                        }
                    }
                }}
                listeners={{
                    tabPress: e => {
                        if (isTradeModalVisible) {
                            e.preventDefault()
                        }
                    }
                }}
            />
        </Tab.Navigator>
    )
}

export default Tabs;
