import { usesubStocksContext } from "../hooks/useStocksContext"
import { useEffect, useState} from "react"
import { useAuthContext } from "../hooks/useAuthContext"
const finnhub = require('finnhub');


const SubStocks = ({subStock, tickerData}) => {
    const symbol = subStock.ticker
    let [stockData, setStockData] = useState([])
    let [stockName, setStockName] = useState('')
    let [stockPic, setStockPic] = useState('')
    let [price, setPrice] = useState(-1)

    // const getStockData = async () => {
    //     const api_key = finnhub.ApiClient.instance.authentications['api_key'];
    //     api_key.apiKey = "cghh549r01qjd0395a6gcghh549r01qjd0395a70";
    //     const finnhubClient = new finnhub.DefaultApi()

    //     finnhubClient.companyProfile2({'symbol': 'AAPL'}, (error, data, response) => {
    //         if(response.ok){
    //             setStockData(data)
    //         }
    //       });
    //       console.log(stockData.name)
    //     //   setStockName(stockData.name)
    //     //   setStockPic(stockData.logo)
    // }

    const getTickerPrice = () => {
        tickerData.forEach((ticker)=> {
            if(ticker.T === subStock.ticker){
                const stockPrice = ticker.vw
                setPrice(stockPrice)
                console.log(stockPrice)
            } 
        })
    }

    useEffect(() => { 
        getTickerPrice()
        // getStockData()
    }, [])

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
      const handleClick = () => {

      }
return(
    <div className="stock-info">
    {/* {stockPic && <div className="sub-stock-title"><img src={`${stockPic}`} class="stock-icon"/><h4>{subStock.ticker} - {stockName}</h4></div>} */}
    
    <p className="para"><strong>Current (Daily) Price $: </strong>{price && roundTo(price, 2)}</p>
    <span onClick={handleClick}>Delete</span>
</div>
)
}


export default SubStocks