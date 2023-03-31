import { useEffect, useState} from "react"
import { useAuthContext } from "../hooks/useAuthContext"

let cts = require('check-ticker-symbol');

const SubStocksForm = () => {
    const {user, dispatch} = useAuthContext()
    let [ticker, setTicker] = useState('')
    const [error, setError] = useState(null)
    const [emptyFields, setEmptyFields] = useState([])
    const handleSubmit = async (e) => {
        e.preventDefault()

        // Check if we got a user 
        if(!user){
            setError('You must be logged in')
            return
        }
    }
    
    return (
        <form className="sub-stock-form" onSubmit={handleSubmit}>
            <h3>Add Stocks to Watch</h3>
            
            <label>Enter A Ticker (Symbol): </label>
            <input 
                type="text"
                onChange={(e) => setTicker(e.target.value)}
                value={ticker}
                maxLength="5"
                onInput={(e) => e.target.value = ("" + e.target.value).toUpperCase()}
                className={emptyFields.includes('ticker') ? 'error' : ''}
            />

            <button>Subscribe To Stock</button>
            {/* We will see the error message if there is any  */}
            {error && <div className="error">{error}</div>}
        </form>
    )
}

export default SubStocksForm