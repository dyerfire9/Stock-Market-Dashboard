import { useEffect, useState} from "react"
import { useStocksContext } from "../hooks/useStocksContext"
import { useAuthContext } from "../hooks/useAuthContext"

let cts = require('check-ticker-symbol');

const StockForm = () => {
    const {dispatch} = useStocksContext()
    const {user, dispatch: userDispatch} = useAuthContext()

    const [ticker, setTicker] = useState('')
    const [shares, setShares] = useState('')
    const [cost, setCost] = useState('')
    const [error, setError] = useState(null)
    const [emptyFields, setEmptyFields] = useState([])

    
    const handleSubmit = async (e) => {
        e.preventDefault()

        // Check if we got a user 
        if(!user){
            setError('You must be logged in')
            return
        }
        const email = user.email
        const amount = shares * cost
        const response1 = await fetch('/api/user/subBalance', {
            method: 'POST',
            body: JSON.stringify({amount, email}),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${user.token}`
            }
        })
        const json1 = await response1.json()

        if (!response1.ok) {
            setError(json1.error)
        }
        // if response is good, we will reset all the states and set error state to null again
        if (response1.ok){
            console.log('User Before', user)
            userDispatch({type: 'SET_BALANCE', payload: json1.balance})
            console.log('User After', user)
        }



        
        const stock = {ticker, shares, cost}

        const response = await fetch('/api/stocks', {
            method: 'POST',
            body: JSON.stringify(stock),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${user.token}`
            }
        })
        const json = await response.json()

        if (!response.ok) {
            setError(json.error)
            setEmptyFields(json.emptyFields)
        }
        // if response is good, we will reset all the states and set error state to null again
        if (response.ok){
            setTicker('')
            setShares('')
            setCost('')
            setError(null)
            setEmptyFields([])
            console.log('new stock bought', json)
            dispatch({type: 'BUY_STOCK', payload: json})

        }
    }
    
    return (
        <form className="create1" onSubmit={handleSubmit}>
            <h3>Buy a Stock</h3>
            
            <label>Ticker (Symbol): </label>
            <input 
                type="text"
                onChange={(e) => setTicker(e.target.value)}
                value={ticker}
                maxLength="5"
                onInput={(e) => e.target.value = ("" + e.target.value).toUpperCase()}
                className={emptyFields.includes('ticker') ? 'error' : ''}
            />
            
            <label>No of Shares: </label>
            <input 
                type="number"
                onChange={(e) => setShares(e.target.value)}
                value={shares}
                min="1"
                step='1'
                className={emptyFields.includes('shares') ? 'error' : ''}
            />
            
            <label>Buy Price ($): </label>
            <input 
                type="number"
                onChange={(e) => setCost(e.target.value)}
                value={cost}
                min="0.01"
                step="0.01"
                className={emptyFields.includes('cost') ? 'error' : ''}
            />

            <button>Buy Stock</button>
            {/* We will see the error message if there is any  */}
            {error && <div className="error">{error}</div>}
        </form>
    )
}

export default StockForm