import { useEffect, useState} from "react"
import { useStocksContext } from "../hooks/useStocksContext"
import { useAuthContext } from '../hooks/useAuthContext'

import SubStocks from "../components/SubStocks"
import SubStocksForm from "../components/SubStocksForm"

export default function SubscribedStocks(){
    const {stocks, dispatch} = useStocksContext()
    let [subStocks, setSubStocks] = useState([])
    const {user} = useAuthContext()
    let [tickerData, setTickerData] = useState([])
    const date = new Date()
    date.setDate(date.getDate() - 1);
    const curDate = `${date.getFullYear}-${date.getMonth()}-${date.getDate()}`
    const currDate = `2023-03-28`
    const uri = `https://api.polygon.io/v2/aggs/grouped/locale/us/market/stocks/${currDate}?adjusted=true&apiKey=YdLBTieOVWxldpeGKLoFHMZ5T_Dd3ti_`    

    useEffect(() => {
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
