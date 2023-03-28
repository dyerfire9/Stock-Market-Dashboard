import { useEffect, useState} from "react"
import { useStocksContext } from "../hooks/useStocksContext"

import StockInfo from '../components/StockInfo'
import StockForm from '../components/StockForm'

export default function Stocks(){
    const {stocks, dispatch} = useStocksContext()
    
    useEffect(() => {
        // All of our fetch logic will go here
        const fetchStocks = async () => {
            const response = await fetch('http://localhost:5000/api/stocks')
            const json = await response.json()

            // Now we check if the response is ok
            // We will update the stock data using the dispatch function 
            if (response.ok) {
                // We will run the set stocks function and pass in the data as json
                dispatch({type: 'SET_STOCKS', payload: json})
                
            } 
        }
        fetchStocks()
    }, [dispatch])
    
    return(
        <div className="stocks">
            <div className="stocks-components">
            {stocks && stocks.map((stock) => (
                <StockInfo key={stock._id} stock={stock} />
            ))}
            </div>
            <StockForm/>
        </div>
    )
}
