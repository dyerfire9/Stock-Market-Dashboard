// const finnhub = require('finnhub');

// // Finhub Stocks API 
// const api_key = finnhub.ApiClient.instance.authentications['api_key'];
// api_key.apiKey = "cghh549r01qjd0395a6gcghh549r01qjd0395a70" // Replace this
// const finnhubClient = new finnhub.DefaultApi()


const StockInfo = ({stock}) => {



    return (
        <div className="stock-info">
            <h4>{stock.ticker}</h4>
            <p><strong>No of Shares: </strong>{stock.shares}</p>
            <p><strong>Buy Price $: </strong>{stock.cost}</p>
        </div>
    )
}

export default StockInfo