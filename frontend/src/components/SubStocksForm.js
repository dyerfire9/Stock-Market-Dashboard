import { useState} from "react"
import { useAuthContext } from "../hooks/useAuthContext"
import { useSubStocksContext } from "../hooks/useSubStocksContext"


const SubStocksForm = () => {
    const {user} = useAuthContext()
    const {dispatch} = useSubStocksContext()
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

        // Add ticker to stock subscription
        const response = await fetch('/api/subStocks', {
            method: 'POST',
            body: JSON.stringify({ticker}),
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
        // If response is good, we will reset all the states and update the global substock state
        if (response.ok){
            setTicker('')
            setError(null)
            setEmptyFields([])
            dispatch({type: 'ADD_SUBSTOCK', payload: json})
        }
    }
    
    return (
        <form className="sub-stock-form" onSubmit={handleSubmit}>
            <h3>Add Stocks to Track</h3>
            
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