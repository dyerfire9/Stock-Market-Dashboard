import {Link} from 'react-router-dom'
import {useLogout} from '../hooks/useLogout'
import { useAuthContext } from '../hooks/useAuthContext';

export default function Navbar(){
    const { logout } = useLogout() 
    const { user } = useAuthContext()
    const name = user && user.user ? user.user.name : '';
    const balance = user && user.user ? user.user.balance : '';
    const handleClick = () => {
        logout()
    }
   
    return(
        <header>
            <div className="container">
                <Link to="/">
                    <h1>Stocks Dashboard</h1>
                </Link>
                <Link to="/subStocks">
                    <h2>Daily Stocks</h2>
                </Link>
                <nav>
                    {user && (<div>
                            <span>Hi, {name}</span>
                            <span> | ${balance}</span>
                            <button onClick={handleClick}>Logout</button>   
                        </div>
                    )}
                        {!user && (<div>
                            <Link to="/login">Login</Link>
                            <Link to="/signup">Signup</Link>
                        </div>
                    )}
                </nav>
            </div>
        </header>
    )
}

