import { useEffect, useState} from "react"
import { useStocksContext } from "../hooks/useStocksContext"
import { useAuthContext } from '../hooks/useAuthContext'

import StockInfo from '../components/StockInfo'
import StockForm from '../components/StockForm'
import FundsForm from "../components/FundsForm"


export default function Dashboard(){
    const {stocks, dispatch} = useStocksContext()
    let [subStocks, setSubStocks] = useState([])
    const {user} = useAuthContext()
    let [tickerData, setTickerData] = useState([])
    const date = new Date();
    date.setDate(date.getDate() - 1);
    const yesterday = date.toISOString().slice(0, 10); 
    const uri = `https://api.polygon.io/v2/aggs/grouped/locale/us/market/stocks/${yesterday}?adjusted=true&apiKey=YdLBTieOVWxldpeGKLoFHMZ5T_Dd3ti_`;

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

        const fetchSubStocks = async () => {
            const response = await fetch('http://localhost:5000/api/subStocks', {
                method: 'GET',
                headers: { 
                    'Authorization': `Bearer ${user.token}`
                }
            })
            const json = await response.json()

            if (response.ok) {
                // We will run the set stocks function and pass in the data as json
                setSubStocks(json)
            } 
        }
        if (user) {
            fetchSubStocks()
        }

        // Get stock data
        async function getStonks(){
            const response = await fetch(uri)
            const json = await response.json()
            return json
        }
        
        getStonks()
        .then((data) => {
            console.log('Data', data.results)
            setTickerData(data.results)
        })
        console.log('i run once')
        
    }, [dispatch, user])

    function RenderStocks(){
        return(
            <div className="stocks">
            <div className="stocks-components">
                {stocks && stocks.map((stock) => (
                    <StockInfo key={stock._id} stock={stock} tickerData={tickerData} />
                ))}
            </div>
            <StockForm/>
            <FundsForm/>
        </div>
        )
    }

    return(
        <RenderStocks/>
    )
}
