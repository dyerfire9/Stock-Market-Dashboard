import {SubStocksContext} from '../context/SubStockContext'
import { useContext } from 'react'

export const useSubStocksContext = () => {
    const context = useContext(SubStocksContext)

    if (!context){
        throw Error('useStocksContext must be used inside an SubStocksContextProvider')
    }


    return context
}