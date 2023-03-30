import { useEffect, useState} from "react"
import { useStocksContext } from "../hooks/useStocksContext"
import { useAuthContext } from '../hooks/useAuthContext'

import StockInfo from '../components/StockInfo'
import StockForm from '../components/StockForm'

export default function Stocks(){
    const {stocks, dispatch} = useStocksContext()
    const {user} = useAuthContext()
    let [tickerData, setTickerData] = useState([])
    const date = new Date()
    date.setDate(date.getDate() - 1);
    const curDate = `${date.getFullYear}-${date.getMonth()}-${date.getDate()}`
    const currDate = `2023-03-28`
    const uri = `https://api.polygon.io/v2/aggs/grouped/locale/us/market/stocks/${currDate}?adjusted=true&apiKey=YdLBTieOVWxldpeGKLoFHMZ5T_Dd3ti_`

    async function getStonks(){
        const response = await fetch(uri)
        const json = await response.json()
        return json
    }

    useEffect(() => {
        getStonks()
        .then((data) => {
            console.log('Data', data.results)
            setTickerData(data.results)
        })
        console.log('i run once')
    }, [])
    

    useEffect(() => {
        // All of our fetch logic will go here
        const fetchStocks = async () => {
            const response = await fetch('http://localhost:5000/api/stocks', {
                headers: { 
                    'Authorization': `Bearer ${user.token}`
                }
            })
            const json = await response.json()

            // Now we check if the response is ok
            // We will update the stock data using the dispatch function 
            if (response.ok) {
                // We will run the set stocks function and pass in the data as json
                dispatch({type: 'SET_STOCKS', payload: json})
                
            } 
        }
        if (user) {
            fetchStocks()
        }
    }, [dispatch, user])
    return(
        <div className="stocks">
            <div className="stocks-components">
            {stocks && stocks.map((stock) => (
                <StockInfo key={stock._id} stock={stock} tickerData={tickerData} />
            ))}
            </div>
            <StockForm/>
        </div>
    )
}
