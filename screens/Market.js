import React, { 
    useEffect, 
    useState, 
    createRef, 
    useRef,
    useCallback
} from 'react';
import {
    View,
    Text,
    FlatList,
    Image,
    TouchableOpacity,
    Animated
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { getCoinMarket } from '../stores/market/marketAction';
import { LineChart } from 'react-native-chart-kit';
import { BalanceInfo, Chart, HeaderBar, TextButton } from "../components";
import { constants, COLORS, SIZES, FONTS, dummyData, icons } from "../constants";

const marketTabs = constants.marketTabs.map((marketTab) => ({
    ...marketTab,
    ref: createRef()
}));

import MainLayout from "./MainLayout";


const TabIndicator = ({measureLayout, scrollX}) => {

    const inputRange = marketTabs.map((_, i) => i * SIZES.width);

    const translateX = scrollX.interpolate({
        inputRange,
        outputRange: measureLayout.map(measure => measure.x)
    });

    return (
        <Animated.View 
            style={{
                position: "absolute",
                left: 0,
                height: "100%",
                width: (SIZES.width - (SIZES.radius * 2)) /2,
                borderRadius: SIZES.radius,
                backgroundColor: COLORS.lightGray,
                transform: [{ 
                    translateX 
                }] 
            }}
        />
    )
}


const Tab = ({ scrollX, onMarketTabPress }) => {

    const [measureLayout, setMeasureLayout] = useState([]);
    const containerRef = useRef();

    useEffect(() => {
        var ml = [];
        marketTabs.forEach(marketTab => {
            marketTab?.ref?.current?.measureLayout(
                containerRef.current,
                (x, y, width, height) => {
                    ml.push({
                     x, y, width, height
                    })

                    if (ml.length === marketTabs.length) {
                        setMeasureLayout(ml)
                    }
                }
            )
        })

    }, [containerRef.current]);

    return (
        <View
            ref={ containerRef }
            style={{
                flexDirection: 'row'
            }}
        >
            {
                measureLayout.length > 0 && 
                <TabIndicator 
                    measureLayout={measureLayout} 
                    scrollX={scrollX} 
                />
            }

            {
                marketTabs.map((item, index) => {
                    return (
                        <TouchableOpacity
                            key={`marketTab-${index}`}
                            style={{
                                flex: 1
                            }}
                            onPress={() => onMarketTabPress(index)}
                        >
                            <View
                                ref={item.ref}
                                style={{
                                    paddingHorizontal: SIZES.padding,
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    height: 40
                                }}
                            >
                                <Text
                                    style={{
                                        color: COLORS.white,
                                        ...FONTS.h3
                                    }}
                                >
                                    {item.title}
                                </Text>
                            </View>
                        </TouchableOpacity>
                    )
                })
            }
        </View>
    )
}

const Market = () => {

    const scrollX = useRef(new Animated.Value(0)).current;
    const marketTabScrollViewRef = useRef();

    const onMarketTabPress = useCallback(marketTabIndex => {
        marketTabScrollViewRef?.current?.scrollToOffset({
            offset: marketTabIndex * SIZES.width
        })
    })

    const { coins } = useSelector(state => state.marketReducer);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getCoinMarket());
    }, []);

    const [selectedCoin, setSelectedCoin] = useState(null);

    const renderTabBar = () => {
        return (
            <View
                style={{
                    marginTop: SIZES.radius,
                    marginHorizontal: SIZES.radius,
                    borderRadius: SIZES.radius,
                    backgroundColor: COLORS.gray,
                    marginTop: 20
                }}
            >
                <Tab 
                    scrollX={scrollX}
                    onMarketTabPress={onMarketTabPress}
                />
            </View>
        )
    }

    const renderButtons = () => {
        return (
            <View
                style={{
                    flexDirection: 'row',
                    marginTop: SIZES.radius,
                    marginHorizontal: SIZES.radius,
                }}
            >
                <TextButton label="USD" />
                <TextButton label="% 7d" containerStyle={{ marginLeft: SIZES.base }} />
                <TextButton label="Top" containerStyle={{ marginLeft: SIZES.base }} />
            </View>
        )
    }

    const renderList = () => {
        return (
            <Animated.FlatList 
                data={marketTabs}
                ref={marketTabScrollViewRef}
                contentContainerStyle={{
                    marginTop: SIZES.padding
                }}
                horizontal
                pagingEnable
                scrollEventThrottle={16}
                snapToAlignment="center"
                showHorizontalScrollIndicator={false}
                keyExtractor={item => item.id}
                onScroll={Animated.event(
                    [{nativeEvent: {contentOffset: {x: scrollX}}}], 
                    {useNativeDriver: false},
                )}
                renderItem={({item, index}) => {
                    return (
                        <View 
                            style={{
                                flex: 1,
                                width: SIZES.width,
                            }}
                        >
                            <FlatList
                                data={coins}
                                keyExtractor={item => item.id}
                                renderItem={({item})=>{
                                    let priceColor = (item.price_change_percentage_7d_in_currency == 0)
                                                        ? COLORS.lightGray3
                                                        : (item.price_change_percentage_7d_in_currency > 0)
                                                            ? COLORS.lightGreen
                                                            : COLORS.red 
                                    return(
                                        <View
                                            style={{
                                                flexDirection: 'row',
                                                paddingHorizontal: SIZES.padding,
                                                marginBottom: SIZES.radius
                                            }}
                                        >
                                            <View
                                                style={{
                                                    flex: 1.5,
                                                    flexDirection: "row",
                                                    alignItems: "center",
                                                }}
                                            >
                                                <Image 
                                                    source={{ uri: item.image }}
                                                    style={{
                                                        height: 20,
                                                        width:20
                                                    }}
                                                />
                                                <Text 
                                                    style={{ marginLeft: SIZES.radius,color: COLORS.white, ...FONTS.body3 }}
                                                >
                                                    {item.name}
                                                </Text>
                                            </View>
                                            <View
                                                style={{
                                                    flex: 1,
                                                    alignItems: "center"
                                                }}
                                            >
                                                <LineChart
                                                    data={{
                                                        datasets: [
                                                            {
                                                                data: item.sparkline_in_7d.price
                                                            }
                                                        ]
                                                    }}
                                                    withHorizontalLabels={false}
                                                    withVerticalLabels={false}
                                                    withHorizontalLines={false}
                                                    withVerticalLines={false}
                                                    withInnerLines={false}
                                                    withOuterLines={false}
                                                    withDots={false}
                                                    width={100}
                                                    height={70}
                                                    chartConfig={{
                                                        color: () => priceColor,
                                                        strokeWidth: 1,
                                                        backgroundGradientFromOpacity: 0,
                                                        backgroundGradientToOpacity: 0,
                                                    }}
                                                    bezier
                                                    style={{
                                                        paddingRight: 0
                                                    }}

                                                />
                                            </View>
                                            <View
                                                style={{
                                                    flex: 1,
                                                    justifyContent: 'center',
                                                    alignItems: 'flex-end',
                                                }}
                                            >
                                                <Text 
                                                    style={{ textAlign: 'right', color: COLORS.white, ...FONTS.body5 }}
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
                                                        style={{ marginLeft: 5, color: priceColor, ...FONTS.body6, lineHeight: 15 }}
                                                    >
                                                        {item.price_change_percentage_7d_in_currency.toFixed(2)}%
                                                    </Text>

                                                </View>
                                            </View>
                                        </View>
                                    )
                                }}
                                ListFooterComponent={
                                    <View style={{ marginBottom: SIZES.radius }} />
                                }
                            />
                        </View>
                    )
                }}
            />
        )
    }

    return (
        <MainLayout>
            <View
                style={{
                    flex: 1,
                    backgroundColor: COLORS.black,
                }}
            >
                <HeaderBar title='Market' containerStyle={{ paddingHorizontal: SIZES.padding }} />
                { renderTabBar() }
                { renderButtons() }
                { renderList() }
            </View>
        </MainLayout>
    )
}

export default Market;