import {BrowserRouter, Routes, Route, Navigate} from 'react-router-dom'
import { useAuthContext } from "./hooks/useAuthContext"

import Stocks from './pages/Stocks';
import Signup from './pages/Signup';
import Login from './pages/Login';
import Navbar from './components/Navbar';
import Dashboard from './pages/Dashboard';

function App() {
  const {user} = useAuthContext()

  return (
    <div className="App">
      <BrowserRouter>
       <Navbar/>
        <div className="pages">
          <Routes>
            <Route path='/' element={user ? <Stocks/> : <Navigate to='/login'/>}/>
            <Route path='/subStocks' element={user ? <Dashboard/> : <Navigate to='/login'/>}/>
            <Route path='/signup' element={!user ? <Signup/> : <Navigate to='/'/>}/>
            <Route path='/login' element={!user ? <Login/> : <Navigate to='/'/>}/>
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
