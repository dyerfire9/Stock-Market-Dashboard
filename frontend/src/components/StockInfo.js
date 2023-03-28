import formatDistanceToNow from 'date-fns/formatDistanceToNow'
import { useStocksContext } from "../hooks/useStocksContext"

// const finnhub = require('finnhub');

// // Finhub Stocks API 
// const api_key = finnhub.ApiClient.instance.authentications['api_key'];
// api_key.apiKey = "cghh549r01qjd0395a6gcghh549r01qjd0395a70" // Replace this
// const finnhubClient = new finnhub.DefaultApi()


const StockInfo = ({stock}) => {
    const {dispatch} = useStocksContext()

    async function handleClick() {
        const response = await fetch('/api/stocks/' + stock._id, {
            method: 'DELETE'
        })
        const json = await response.json()

        if (response.ok){
            dispatch({type: 'SELL_STOCK', payload: json})
        }
    }

    return (
        <div className="stock-info">
            <h4>{stock.ticker}</h4>
            <p><strong>No of Shares: </strong>{stock.shares}</p>
            <p><strong>Buy Price $: </strong>{stock.cost}</p>
            <p>{formatDistanceToNow(new Date(stock.createdAt), {addSuffix: true})}</p>
           <span onClick={handleClick}>Sell Stock</span>
        </div>
    )
}

export default StockInfo