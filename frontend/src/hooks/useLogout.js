
import { useAuthContext } from './useAuthContext';

export const useLogout = () => {
    const {dispatch} = useAuthContext()
    
    const logout = () => {
        // remove user and token from local storage
        localStorage.removeItem('user')

        // dispatch logout action
        dispatch({type: 'LOGOUT'})
    }
    return {logout}
}