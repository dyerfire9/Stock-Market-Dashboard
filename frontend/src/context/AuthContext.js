import {createContext, useReducer, useEffect} from 'react'

export const AuthContext = createContext()

export const authReducer = (state, action) => {
    switch(action.type){
        // Login handler
        case 'LOGIN':
            return {user: action.payload}

        // Logout handler
        case 'LOGOUT':
            return {user: null}
        // Balance Update handler
        case 'SET_BALANCE':
            return {...state, user: {...state.user, user: {...state.user.user, balance: action.payload}}}
        default:
            return state
    }
}
export const AuthContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(authReducer, { 
        user: null
    })

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('user'))
        
        if(user){
            dispatch({type: 'LOGIN', payload: user})
        }
    
    }, [])

    // console.log('AuthContext state: ', state)
    return(
        <AuthContext.Provider value={{...state, dispatch}}>
            {children}
        </AuthContext.Provider>
    )
}