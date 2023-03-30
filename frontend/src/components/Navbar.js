import {Link} from 'react-router-dom'
import {useLogout} from '../hooks/useLogout'
import { useAuthContext } from '../hooks/useAuthContext';

export default function Navbar(){
    const { logout } = useLogout() 
    const { user } = useAuthContext()

    const handleClick = () => {
        logout()
    }

    return(
        <header>
            <div className="container">
                <Link to="/">
                    <h1>Stocks Dashboard</h1>
                </Link>
                <Link to="/portfolio">
                    <h2>Portfolio</h2>
                </Link>
                <nav>
                    {user && (<div>
                            <span>Hi, {user.u_name}</span>
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

