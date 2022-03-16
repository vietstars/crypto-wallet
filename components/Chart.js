import React from "react";
import {
    View,
    Text
} from "react-native";

import { COLORS, SIZES, FONTS } from "../constants";
import { LineChart } from 'react-native-wagmi-charts';
import moment from 'moment';

const Chart = ({containerStyle, chartPrices, lastPrice, changePct})=>{

    let startUnixTimestamp = moment().subtract(7, 'day').unix();

    let data = chartPrices ? chartPrices?.map((item, index) => {
        return {
            timestamp: startUnixTimestamp + (index + 1) * 3600,
            value: item
        }
    }) : [];

    let priceColor = changePct == 0
                        ? COLORS.lightGray3 
                        : (changePct > 0 ? COLORS.lightGreen : COLORS.red);

    let dotColor = changePct < 0 ? COLORS.lightGreen : COLORS.red;

    const formatNumber = (value, roundingPoint) => {
        switch(true) {
            case (value > 1e15):
                return `${(value / 1e15).toFixed(roundingPoint)}Q`;
            case (value > 1e12):
                return `${(value / 1e12).toFixed(roundingPoint)}T`;
            case (value > 1e9):
                return `${(value / 1e9).toFixed(roundingPoint)}B`;
            case (value > 1e6):
                return `${(value / 1e6).toFixed(roundingPoint)}M`;
            case (value > 1e3):
                return `${(value / 1e3).toFixed(roundingPoint)}K`;
            default:
                return value.toFixed(roundingPoint);
        }
    }

    const formatCurrency = (value) => {
        'worklet';
        return `$${value>0 ? Number(value).toLocaleString() : Number(lastPrice)?.toLocaleString() }`;
    }

    const formatDateTime = ({ value, formatted }) => {
        'worklet';
        if (value === -1) {
            //var selectedDate = new Date();
            return 'Slide to view';
        }

        var selectedDate = new Date(value * 1000);

        return `${selectedDate.toLocaleString()}`;
    }

    const getYAxisLabelValues = () => {
        if (chartPrices != undefined) {
            let minValue = Math.min(...chartPrices)
            let maxValue = Math.max(...chartPrices)
            let midValue = (minValue + maxValue) /2
            let lowerMidValue = (minValue + midValue) /2
            let higherMidValue = (maxValue + midValue) /2

            let roundingPoint = 2

            return [
                formatNumber(maxValue, roundingPoint),
                formatNumber(higherMidValue, roundingPoint),
                formatNumber(midValue, roundingPoint),
                formatNumber(lowerMidValue, roundingPoint),
                formatNumber(minValue, roundingPoint)
            ]
        }
    }
    
    return (
        <View 
            style={{ 
                ...containerStyle, 
                alignItems: 'center',
                justifyContent: 'center' 
            }}
        >
            <View
            style={{
                position: "absolute",
                left: SIZES.base,
                top: 0,
                bottom: 10,
                justifyContent: 'space-between'
            }}
            >
                {
                    getYAxisLabelValues()?.map((item, index) => {
                        return (
                            <Text
                                key={index}
                                style={{
                                    color: COLORS.lightGray3,
                                    ...FONTS.body5
                                }}
                            >
                                { item }
                            </Text>
                        )
                    })
                }
            </View>
            <View
            style={{
                position: "absolute",
                right: SIZES.base,
                top: 0,
                bottom: 10,
                justifyContent: 'space-between'
            }}
            >
                <Text
                    style={{
                        color: priceColor,
                        ...FONTS.body5
                    }}
                >
                    ${ lastPrice?.toLocaleString() }
                </Text>
            </View>
            <LineChart.Provider data={data}>
                <LineChart width={SIZES.width - 20} height={ (SIZES.width - 20) / 2 } >
                    <LineChart.Path color={priceColor} width={2} >
                        <LineChart.Gradient color={priceColor} />
                    </LineChart.Path>
                    <LineChart.CursorCrosshair color={dotColor} size={20} >
                      <LineChart.Tooltip
                        style={{
                          backgroundColor: 'rgba(255,255,255,0.5)',
                          borderRadius: 4,
                          fontSize: FONTS.body4,
                          padding: 4
                        }}
                      >
                            <LineChart.PriceText
                                format={ formatCurrency }
                                style={{ color: COLORS.black }}
                            />
                      </LineChart.Tooltip>
                    </LineChart.CursorCrosshair>
                </LineChart>
                <LineChart.DatetimeText 
                    style={{
                        color: COLORS.lightGray3,
                        borderRadius: 4,
                        fontSize: 12,
                        padding: 4,
                        textAlign: 'center',
                        marginTop: -20
                    }}
                    format={ formatDateTime }
                />

            </LineChart.Provider>
        </View>
    )
}

export default Chart;