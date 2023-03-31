import { useEffect, useState} from "react"
import { useAuthContext } from "../hooks/useAuthContext"

let cts = require('check-ticker-symbol');

const FundsForm = () => {
    const {user} = useAuthContext()
    let [amount, setAmount] = useState(1)
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
        const response = await fetch('/api/user/balance', {
            method: 'POST',
            body: JSON.stringify({amount, email}),
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
            console.log('Added Funds', json)
            console.log(user)
        }
    }
    
    return (
        <form className="create" onSubmit={handleSubmit}>
            <h3>Add Funds</h3>
            
            <label>Ticker Symbol ($): </label>
            <input 
                type="number"
                onChange={(e) => setAmount(e.target.value)}
                value={amount}
                min="0.01"
                step="0.01"
                className={emptyFields.includes('amount') ? 'error' : ''}
            />

            <button>Add Funds</button>
            {/* We will see the error message if there is any  */}
            {error && <div className="error">{error}</div>}
        </form>
    )
}

export default FundsForm