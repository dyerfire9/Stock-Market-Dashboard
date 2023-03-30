import formatDistanceToNow from 'date-fns/formatDistanceToNow'
import { useStocksContext } from "../hooks/useStocksContext"
import { useEffect, useState} from "react"
import { useAuthContext } from "../hooks/useAuthContext"


const StockInfo = ({stock, tickerData}) => {
    let [data, setData] = useState({})
    let [price, setPrice] = useState(-1)
    let [change, setChange] = useState(-1)
    let [totalValue, setTotalValue] = useState('')
  

    useEffect(() => { 
        tickerData.forEach((ticker)=> {
            if(ticker.T === stock.ticker){
                setData(ticker)
                console.log(data)
            }
            const stockPrice = data.vw
            setPrice(stockPrice)
            setChange((((stockPrice - stock.cost)) / stock.cost) * 100)
            setTotalValue((stock.shares * stockPrice))
        })
    }, [])

    // function getStonks(){}
    //     tickerData.forEach((ticker)=> {
    //         if(ticker.T === stock.ticker){
    //             setData(ticker)
    //             console.log(data)
    //         }
    //     })
    // }
    
    // useEffect(() => {
    //     getStonks()
    //     const stockPrice = data.vw
    //     setPrice(stockPrice)
    //     setChange((((stockPrice - stock.cost)) / stock.cost) * 100)
    //     setTotalValue((stock.shares * price))
    //   }, []); 
  
    function roundTo(n, digits) {
        if (digits === undefined) {
          digits = 0;
        }
      
        var multiplicator = Math.pow(10, digits);
        n = parseFloat((n * multiplicator).toFixed(11));
        var test =(Math.round(n) / multiplicator);
        return +(test.toFixed(digits));
      }

    const {dispatch} = useStocksContext()
    const {user} = useAuthContext()

    async function handleClick() {
        if (!user){
            return
        }
        const response = await fetch('/api/stocks/' + stock._id, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${user.token}`
            }
        })
        const json = await response.json()

        if (response.ok){
            dispatch({type: 'SELL_STOCK', payload: json})
        }
    }

    return (  
        <div className="stock-info">
            <h4>{stock.ticker}</h4>
            <p className="para"><strong>No of Shares: </strong>{stock.shares}</p>
            <p className="para"><strong>Buy Price $: </strong>{stock.cost}</p>
            <p className="para"><strong>Current (Daily) Price $: </strong>{price && roundTo(price, 2)}</p>
            <p className={`change ${((change) > 0) ? 'change-green' : 'change-red'}`}><strong>Change %: </strong>{roundTo(change, 2)}</p>
            <p className="para"><strong>Total Value $:</strong> ${totalValue}</p>
            <p className="para">Bought {formatDistanceToNow(new Date(stock.createdAt), {addSuffix: true})}</p>
           <span onClick={handleClick}>Sell Stock</span>
        </div>
    )
}

export default StockInfo