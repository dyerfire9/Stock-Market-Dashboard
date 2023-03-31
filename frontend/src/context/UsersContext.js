import { createContext, useReducer } from "react";

// Create a context object
export const UsersContext = createContext()

// the state - is the previous user state
// action is the dispatch, which had the type and payload
export const usersReducer = (state, action) => {
  switch(action.type){
    // Set the user
    case 'SET_USER':
        return{
            stocks: action.payload
        }
    // Update user
    case 'UPDATE_USER':
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



export const UsersContextProvider = ({children}) => {
    const [state, dispatch] = useReducer(usersReducer, {
        user: null
    })

    return (
      // state - we update the state (user)
      // dispatch({type: }, data to make the cahnge (payload))
      <UsersContext.Provider value={{...state, dispatch}}>
        {children}
      </UsersContext.Provider>  
    )

}