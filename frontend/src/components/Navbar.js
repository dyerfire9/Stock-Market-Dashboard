import {Link} from 'react-router-dom'


export default function Navbar(){
    return(
        <header>
            <div className="container">
                <Link to="/">
                    <h1>Stocks Dashboard</h1>
                </Link>
                <Link to="/portfolio">
                    <h2>Portfolio</h2>
                </Link>
            </div>
        </header>
    )
}

