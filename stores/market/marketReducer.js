import * as marketActions from './marketAction';

const initialState = {
    myHoldings: [],
    coins: [],
    error: null,
    loading: false
}

const marketReducer = (state = initialState, action) => {

    switch (action.type) {
        case marketActions.GET_HOLDINGS_BEGIN:
            return {
                ...state,
                loading: true
            }
        case marketActions.GET_HOLDINGS_SUCESS:
            return {
                ...state,
                myHoldings: action.payload.myHoldings
            }
        case marketActions.GET_HOLDINGS_FAILURE:
            return {
                ...state,
                error: action.payload.error
            }
        case marketActions.GET_COIN_MARKET_BEGIN:
            return {
                ...state,
                loading: true
            }
        case marketActions.GET_COIN_MARKET_SUCESS:
            return {
                ...state,
                coins: action.payload.coins
            }
        case marketActions.GET_COIN_MARKET_FAILURE:
            return {
                ...state,
                error: action.payload.error
            }
        default:
            return state
    }
}

export default marketReducer;