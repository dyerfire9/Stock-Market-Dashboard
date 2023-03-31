import { createContext, useReducer } from "react";

// Create a context object
export const SubStocksContext = createContext()

export const SubStocksReducer = (state, action) => {

    switch(action.type){
        // Set sub-stocks
        case 'SET_SUBSTOCKS':
            return{
                subStocks: action.payload
            }
        // Add substock
        case 'ADD_SUBSTOCK':
            return{
                subStocks: [action.payload, ...state.subStocks]
            
            }
        // Delete substock
        case 'DELETE_SUBSTOCK':
            return{
                subStocks: state.subStocks.filter((subStock) => subStock._id !== action.payload._id)
            }
        default:
            return state
    }
} 

export const SubStocksContextProvider = ({children}) => {
    const [state, dispatch] = useReducer(SubStocksReducer, {
        subStocks: null
    })

    return (
      <SubStocksContext.Provider value={{...state, dispatch}}>
        {children}
      </SubStocksContext.Provider>  
    )

}