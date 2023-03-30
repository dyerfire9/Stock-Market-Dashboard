import { useSignup } from "../hooks/useSignup"
const { useState } = require("react")

const Signup = () => {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setpassword] = useState('')
    const {signup, error, isLoading} = useSignup()

    const handleSubmit = async (e) => {
        e.preventDefault()

        await signup(name, email, password)
    }

    return(
        <form className="signup" onSubmit={handleSubmit}>
            <h3>Sign up</h3>

            <label>Name:</label>
            <input 
                type="text"
                onChange={(e) => setName(e.target.value)}
                value={name} />

            <label>Email:</label>
            <input 
                type="email"
                onChange={(e) => setEmail(e.target.value)}
                value={email} />

            <label>Password:</label>
            <input 
                type="password"
                onChange={(e) => setpassword(e.target.value)}
                value={password} />

            <button disabled={isLoading}>Sign Up</button>
            {error && <div className="error">{error}</div>}
        </form>
    )
}

export default Signup