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
    default:
        return state
}

}

export const UsersContextProvider = ({children}) => {
    const [state, dispatch] = useReducer(usersReducer, {
        user: null
    })

    return (
      <UsersContext.Provider value={{...state, dispatch}}>
        {children}
      </UsersContext.Provider>  
    )

}