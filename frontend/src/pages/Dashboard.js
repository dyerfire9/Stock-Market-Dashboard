import { useEffect, useState} from "react"
import { useStocksContext } from "../hooks/useStocksContext"
import { useAuthContext } from '../hooks/useAuthContext'

// Import Components
import StockInfo from '../components/StockInfo'
import StockForm from '../components/StockForm'
import FundsForm from "../components/FundsForm"


export default function Dashboard(){
    const {user} = useAuthContext()
    const {stocks, dispatch} = useStocksContext()
    let [subStocks, setSubStocks] = useState([])
    let [tickerData, setTickerData] = useState([])
    const date = new Date();
    date.setDate(date.getDate() - 1);
    const yesterday = date.toISOString().slice(0, 10); 
    const uri = `https://api.polygon.io/v2/aggs/grouped/locale/us/market/stocks/${yesterday}?adjusted=true&apiKey=YdLBTieOVWxldpeGKLoFHMZ5T_Dd3ti_`;

    useEffect(() => {
        const fetchStocks = async () => {
            const response = await fetch('http://localhost:5000/api/stocks', {
                headers: { 
                    'Authorization': `Bearer ${user.token}`
                }
            })
            const json = await response.json()

            // Update the stock global state using the dispatch function 
            if (response.ok) {
                dispatch({type: 'SET_STOCKS', payload: json})
            } 
        }
        if (user) {
            fetchStocks()
        }

        // Get stock data
        async function getStonks(){
            const response = await fetch(uri)
            const json = await response.json()
            return json
        }
        getStonks()
        .then((data) => {
            setTickerData(data.results)
        })
        
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
