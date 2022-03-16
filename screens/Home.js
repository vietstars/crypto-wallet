import React, { useEffect, useState } from 'react';
import {
    View,
    Text,
    FlatList,
    Image,
    TouchableOpacity
} from 'react-native';

import { useSelector, useDispatch } from 'react-redux';
import { getHoldings, getCoinMarket } from '../stores/market/marketAction';
import { COLORS, SIZES, FONTS, dummyData, icons } from "../constants";
import { BalanceInfo, IconTextButton, Chart } from "../components";
import moment from "moment";

import MainLayout from "./MainLayout";

const Home = () => {

    const { myHoldings, coins } = useSelector(state => state.marketReducer);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getHoldings(holdings = dummyData.holdings));
        dispatch(getCoinMarket());
    }, []);

    const [selectedCoin, setSelectedCoin] = useState(null);

    let totalWalet = myHoldings.reduce((a, b) => a + (b.total || 0), 0);
    let valueChange = myHoldings.reduce((a, b) => a + (b.holdings_price_chang_7d || 0), 0);
    let perChange = valueChange / (totalWalet - valueChange) * 100;

    function renderWalletInfoSection() {
        return (
            <View
                style={{
                    paddingHorizontal: SIZES.padding,
                    borderBottomLeftRadius: 25,
                    borderBottomRightRadius: 25,
                    backgroundColor: COLORS.lightGray,
                    zIndex: 100
                }}
            >
                <BalanceInfo 
                    title="My wallet"
                    displayAmount={totalWalet}
                    changePct={perChange}
                    containerStyle={{
                        marginTop: 20
                    }}
                />
                <View
                    style={{
                        flexDirection: "row",
                        paddingHorizontal: SIZES.radius,
                        marginTop: 10,
                        marginBottom: -20
                    }}
                >
                    <IconTextButton 
                        label="Transfer" 
                        icon="ios-send" 
                        containerStyle={{
                            flex: 1,
                            height: 40,
                            marginRight: SIZES.radius
                        }}
                        onPress={() => console.log("Transfer")}
                    />
                    <IconTextButton 
                        label="Withdraw" 
                        icon="ios-arrow-down-circle" 
                        containerStyle={{
                            flex: 1,
                            height: 40,
                            marginRight: SIZES.radius
                        }}
                        onPress={() => console.log("Withdraw")}
                    />
                </View>
            </View>
        )
    }

    return (
        <MainLayout>
            <View
                style={{
                    flex: 1,
                    backgroundColor: COLORS.black
                }}
            >
                {renderWalletInfoSection()}

                <FlatList
                    data={coins}
                    keyExtractor={item => item.id}
                    contentContainerStyle={{
                        marginTop: - SIZES.base,
                        paddingHorizontal: SIZES.padding,
                    }}
                    ListHeaderComponent={
                        <View style={{ marginBottom: SIZES.radius }}>
                            <Chart 
                                containerStyle={{
                                    marginTop: SIZES.padding * 2 - 15
                                }}
                                chartPrices={ 
                                    selectedCoin 
                                        ? selectedCoin?.sparkline_in_7d?.price 
                                        : coins[0]?.sparkline_in_7d?.price
                                }
                                changePct={
                                    selectedCoin 
                                        ? selectedCoin?.price_change_percentage_7d_in_currency 
                                        : coins[0]?.price_change_percentage_7d_in_currency
                                }
                                lastPrice={
                                    selectedCoin 
                                        ? selectedCoin?.current_price 
                                        : coins[0]?.current_price
                                }
                            />
                            <Text style={{ color: COLORS.white, ...FONTS.h3, fontSize: 18 }}>Top Cryptocurrency</Text>
                        </View>
                    }
                    renderItem={({item})=>{
                        let priceColor = (item.price_change_percentage_7d_in_currency == 0)
                                            ? COLORS.lightGray3
                                            : (item.price_change_percentage_7d_in_currency > 0)
                                                ? COLORS.lightGreen
                                                : COLORS.red 
                        return(
                            <TouchableOpacity
                                style={{
                                    height: 55,
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                    justifyContent: 'center' 
                                }}
                                onPress={() => { setSelectedCoin(item) }}
                            >
                                <View
                                    style={{
                                        width: 35
                                    }}
                                >
                                    <Image 
                                        source={{ uri: item.image }}
                                        style={{
                                            height: 20,
                                            width:20
                                        }}
                                    />
                                </View>
                                <View
                                    style={{
                                        flex: 1
                                    }}
                                >
                                    <Text 
                                        style={{ color: COLORS.white, ...FONTS.body3 }}
                                    >
                                        {item.name}
                                    </Text>
                                </View>
                                <View>
                                    <Text 
                                        style={{ textAlign: 'right', color: COLORS.white, ...FONTS.h4 }}
                                    >
                                        $ {item.current_price.toLocaleString()}
                                    </Text>
                                    <View
                                        style={{
                                            flexDirection: 'row',
                                            alignItems: 'center',
                                            justifyContent: 'flex-end' 
                                        }}
                                    >
                                        {
                                            item.price_change_percentage_7d_in_currency != 0 &&
                                            <Image 
                                                source={icons.upArrow}
                                                style={{
                                                    width: 10,
                                                    height: 10,
                                                    alignSelf: 'center',
                                                    tintColor: priceColor,
                                                    transform: item.price_change_percentage_7d_in_currency > 0 ? [{ rotate: '45deg' }] : [{ rotate: '125deg' }]
                                                }}
                                            />
                                        }
                                        <Text 
                                            style={{ marginLeft: 5, color: priceColor, ...FONTS.body5, lineHeight: 15 }}
                                        >
                                            {item.price_change_percentage_7d_in_currency.toFixed(2)}%
                                        </Text>

                                    </View>
                                </View>
                            </TouchableOpacity>
                        )
                    }}
                    ListFooterComponent={
                        <View style={{ marginBottom: SIZES.radius }} />
                    }
                />
            </View>
        </MainLayout>
    )
}

export default Home;