import { useSubStocksContext } from "../hooks/useSubStocksContext"
import { useEffect, useState} from "react"
import { useAuthContext } from "../hooks/useAuthContext"

const finnhub = require('finnhub');


const SubStocks = ({subStock, tickerData}) => {
    const {user, dispatch: userDispatch} = useAuthContext()
    const {dispatch} = useSubStocksContext()
    const symbol = subStock.ticker
    let [price, setPrice] = useState(-1)

    useEffect(() => {

        const getTickerPrice = () => {
            tickerData.forEach((ticker)=> {
                if(ticker.T === subStock.ticker){
                    const stockPrice = ticker.vw
                    setPrice(stockPrice)
                    console.log(stockPrice)
            }})}

        getTickerPrice()
      }, [symbol])

     // Function to round
     function roundTo(n, digits) {
        if (digits === undefined) {
          digits = 0;
        }
        var multiplicator = Math.pow(10, digits);
        n = parseFloat((n * multiplicator).toFixed(11));
        var test =(Math.round(n) / multiplicator);
        return +(test.toFixed(digits));
      }

      const handleClick = async () => {

        const response = await fetch('/api/subStocks/' + subStock._id, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${user.token}`
            }
        })
        const json = await response.json()
    
        if (response.ok){
            dispatch({type: 'DELETE_SUBSTOCK', payload: json})
        }
      }
return(
    <div className="sub-stock-info">
        <div className="sub-stock-title"><h4>{subStock.ticker}</h4></div>
        <p className="para"><strong>Current (Daily) Price $: </strong>{price && roundTo(price, 2)}</p>
        <span className="span1" onClick={handleClick}>Delete</span>
        <a className="span2" target="blank" href={`https://ca.finance.yahoo.com/quote/${symbol}/chart?p=${symbol}`}>View Chart</a>
    </div>
)
}


export default SubStocks