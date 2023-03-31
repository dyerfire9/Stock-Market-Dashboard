import { useEffect, useState} from "react"
import { useSubStocksContext } from "../hooks/useSubStocksContext"
import { useAuthContext } from '../hooks/useAuthContext'

import SubStocks from "../components/SubStocks"
import SubStocksForm from "../components/SubStocksForm"

export default function SubscribedStocks(){
    const {subStocks, dispatch} = useSubStocksContext()
    const {user} = useAuthContext()
    let [tickerData, setTickerData] = useState([])
    const date = new Date();
    date.setDate(date.getDate() - 1);
    const yesterday = date.toISOString().slice(0, 10); 
    const uri = `https://api.polygon.io/v2/aggs/grouped/locale/us/market/stocks/${yesterday}?adjusted=true&apiKey=YdLBTieOVWxldpeGKLoFHMZ5T_Dd3ti_`;

    // Get all Subscribed Stocks
    useEffect(() => {
        const fetchSubStocks = async () => {
            const response = await fetch('/api/subStocks/', {
                method: 'GET',
                headers: { 
                    'Authorization': `Bearer ${user.token}`
                }
            })
            const json = await response.json()

            if (response.ok) {
                // We will run the set stocks function and pass in the data as json
                dispatch({type:'SET_SUBSTOCKS', payload: json})
            } 
        }
        if (user) {
            fetchSubStocks()
        }

        // Get stocks data
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
            <div className="substocks">
            <div className="sub-stocks-components">
                {subStocks && subStocks.map((subStock) => (
                    <SubStocks key={subStock._id} subStock={subStock} tickerData={tickerData} />
                ))}
            </div>
            <SubStocksForm/>
        </div>
        )
    }

    return(
        <RenderStocks/>
    )
}
