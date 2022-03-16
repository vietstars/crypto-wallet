import React, { useEffect, useState } from 'react';
import {
    View,
    Text,
    FlatList,
    Image,
    TouchableOpacity
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { getHoldings } from '../stores/market/marketAction';
import { BalanceInfo, Chart, HeaderBar } from "../components";
import { COLORS, SIZES, FONTS, dummyData, icons } from "../constants";

import MainLayout from "./MainLayout";

const Portfolio = () => {

    const { myHoldings } = useSelector(state => state.marketReducer);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getHoldings(holdings = dummyData.holdings));
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
                <HeaderBar title='Portfolio'/>
                <BalanceInfo 
                    title="Current balance"
                    displayAmount={totalWalet}
                    changePct={perChange}
                    containerStyle={{
                        marginBottom: 10
                    }}
                />
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
                    data={myHoldings}
                    keyExtractor={item => item.id}
                    contentContainerStyle={{
                        marginTop: - SIZES.base,
                        paddingHorizontal: SIZES.padding - 15,
                    }}
                    ListHeaderComponent={
                        <View>
                            <Chart 
                                containerStyle={{
                                    marginTop: SIZES.padding - 15
                                }}
                                chartPrices={ 
                                    selectedCoin 
                                        ? selectedCoin?.sparkline_in_7d?.value
                                        : myHoldings[0]?.sparkline_in_7d?.value
                                }
                                changePct={
                                    selectedCoin 
                                        ? selectedCoin?.price_change_percentage_7d_in_currency
                                        : myHoldings[0]?.price_change_percentage_7d_in_currency
                                }
                                lastPrice={
                                    selectedCoin 
                                        ? selectedCoin?.current_price
                                        : myHoldings[0]?.current_price
                                }
                            />
                            <Text style={{ color: COLORS.white, ...FONTS.h3, fontSize: 18 }}>Your Assets</Text>
                            <View
                                style={{
                                    flexDirection: 'row',
                                    marginTop: SIZES.base
                                }}
                            >
                                <Text
                                    style={{
                                        flex: 1,
                                        color: COLORS.lightGray3,
                                    }}
                                >
                                    Asset
                                </Text>
                                <Text
                                    style={{
                                        flex: 1,
                                        color: COLORS.lightGray3,
                                        textAlign: 'center'
                                    }}
                                >
                                    Price
                                </Text>
                                <Text
                                    style={{
                                        flex: 1,
                                        color: COLORS.lightGray3,
                                        textAlign: 'right'
                                    }}
                                >
                                    Holdings
                                </Text>
                            </View>
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
                                        width: 35,
                                        marginTop: SIZES.base - 3
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
                                <View
                                    style={{
                                        flex: 1,
                                        justifyContent: 'center'
                                    }}
                                >
                                    <Text 
                                        style={{ textAlign: 'center', color: COLORS.white, ...FONTS.body5 }}
                                    >
                                        $ {item.current_price.toLocaleString()}
                                    </Text>
                                    <View
                                        style={{
                                            flexDirection: 'row',
                                            alignItems: 'center',
                                            justifyContent: 'center' 
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
                                            style={{ color: priceColor, ...FONTS.body6, lineHeight: 15 }}
                                        >
                                            {item.price_change_percentage_7d_in_currency.toFixed(2)}%
                                        </Text>

                                    </View>
                                </View>
                                <View
                                    style={{
                                        flex: 1,
                                        justifyContent: 'center'
                                    }}
                                >
                                    <Text 
                                        style={{ textAlign: 'right', color: COLORS.white, ...FONTS.h5 }}
                                    >
                                        $ {item.total.toLocaleString()}
                                    </Text>
                                    <View
                                        style={{
                                            flexDirection: 'row',
                                            justifyContent: 'flex-end'
                                        }}
                                    >
                                        <Text 
                                            style={{ color: COLORS.white, ...FONTS.h6, lineHeight: 15 }}
                                        >
                                            {item.qty}
                                        </Text>
                                        <Text 
                                            style={{ marginLeft: 5, color: COLORS.lightGray3, ...FONTS.body6, lineHeight: 15 }}
                                        >
                                            {item.symbol.toUpperCase()}
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

export default Portfolio;