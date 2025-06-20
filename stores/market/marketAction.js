import axios from 'axios';

export const GET_HOLDINGS_BEGIN = 'GET_HOLDINGS_BEGIN';
export const GET_HOLDINGS_SUCESS = 'GET_HOLDINGS_SUCESS';
export const GET_HOLDINGS_FAILURE = 'GET_HOLDINGS_FAILURE';

export const GET_COIN_MARKET_BEGIN = 'GET_COIN_MARKET_BEGIN';
export const GET_COIN_MARKET_SUCESS = 'GET_COIN_MARKET_SUCESS';
export const GET_COIN_MARKET_FAILURE = 'GET_COIN_MARKET_FAILURE';

export const getHoldingsBegin = () => ({
    type: GET_HOLDINGS_BEGIN
})

export const getHoldingsSuccess = (myHoldings) => ({
    type: GET_HOLDINGS_SUCESS,
    payload: { myHoldings }
})
export const getHoldingsFailure = (error) => ({
    type: GET_HOLDINGS_FAILURE,
    payload: { error }
})

export function getHoldings(
    holdings = [], currency = "usd", orderBy = "market_cap_desc", 
    sparkline = true, priceChangePerc = "7d", perPage = 10, page =1
) {
    return dispatch => {
        dispatch(getHoldingsBegin())

        let ids = holdings.map((item)=>{ return item.id }).join(",");
        let apiUrl = `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency}&order=${orderBy}&per_page=${perPage}&page=${page}&sparkline=${sparkline}&price_change_percentage=${priceChangePerc}&ids=${ids}`;

        return axios({
            url: apiUrl,
            method: 'GET',
            header: {
                Accept: "application/json"
            }
        }).then((response) => {
            if (response.status == 200) {
                let myholdings = response.data.map((item) => {
                    let coin = holdings.find(a => a.id == item.id)
                    //price 7d truoc
                    let price7d = item.current_price / (1 + item.price_change_percentage_7d_in_currency * 0.01)

                    return {
                        id:     item.id,
                        symbol: item.symbol,
                        name:   item.name,
                        image:  item.image,
                        current_price: item.current_price,
                        qty:    coin.qty,
                        total:  coin.qty * item.current_price,
                        price_change_percentage_7d_in_currency: item.price_change_percentage_7d_in_currency,
                        holdings_price_chang_7d: (item.current_price - price7d) * coin.qty,
                        sparkline_in_7d: {
                            value: item.sparkline_in_7d.price.map((price) => {
                                return price * coin.qty
                            })
                        }
                    }
                })

                dispatch(getHoldingsSuccess(myholdings));
            } else {
                dispatch(getHoldingsFailure(response.data));
            }
        }).catch((error) => {
            dispatch(getHoldingsFailure(error));
        })
    }
}

//baos gia thi truong

export const getCoinMarketBegin = () => ({
    type: GET_COIN_MARKET_BEGIN
})

export const getCoinMarketSuccess = (coins) => ({
    type: GET_COIN_MARKET_SUCESS,
    payload: { coins }
})
export const getCoinMarketFailure = (error) => ({
    type: GET_COIN_MARKET_FAILURE,
    payload: { error }
})

export function getCoinMarket(
    currency = "usd", orderBy = "market_cap_desc", 
    sparkline = true, priceChangePerc = "7d", perPage = 10, page =1
) {
    return dispatch => {
        dispatch(getCoinMarketBegin())

        let apiUrl = `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency}&order=${orderBy}&per_page=${perPage}&page=${page}&sparkline=${sparkline}&price_change_percentage=${priceChangePerc}`;

        return axios({
            url: apiUrl,
            method: 'GET',
            header: {
                Accept: "application/json"
            }
        }).then((response) => {
            if (response.status == 200) {
                dispatch(getCoinMarketSuccess(response.data));
            } else {
                dispatch(getCoinMarketFailure(response.data));
            }
        }).catch((error) => {
            dispatch(getCoinMarketFailure(error));
        })
    }
}
