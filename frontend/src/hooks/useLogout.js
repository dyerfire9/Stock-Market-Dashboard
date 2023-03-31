
import { useAuthContext } from './useAuthContext';
import { useStocksContext } from './useStocksContext';

export const useLogout = () => {
    const {dispatch} = useAuthContext()
    const {dispatch: stockDispatch} = useStocksContext()

    const logout = () => {
        // remove user and token from local storage
        localStorage.removeItem('user')

        // dispatch logout action
        dispatch({type: 'LOGOUT'})

        // clear stocks
        stockDispatch({type: 'SET_STOCKS', payload: null})
    }
    return {logout}
}