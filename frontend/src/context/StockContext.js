import { createContext, useReducer } from "react";

// Create a context object
export const StocksContext = createContext()

export const stocksReducer = (state, action) => {

    switch(action.type){
        case 'SET_STOCKS':
            return{
                stocks: action.payload
            }
        case 'BUY_STOCK':
            return{
                stocks: [action.payload, ...state.stocks]
            }
        case 'SELL_STOCK':
            return{
                stocks: state.stocks.filter((stock) => stock._id !== action.payload._id)
            }
        default:
            return state
    }
} 


export const StocksContextProvider = ({children}) => {
    const [state, dispatch] = useReducer(stocksReducer, {
        stocks: null
    })

    return (
      <StocksContext.Provider value={{...state, dispatch}}>
        {children}
      </StocksContext.Provider>  
    )

}