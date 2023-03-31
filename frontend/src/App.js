import {BrowserRouter, Routes, Route, Navigate} from 'react-router-dom'
import { useState, useEffect } from 'react';
import { useAuthContext } from "./hooks/useAuthContext"

import Dashboard from './pages/Dashboard';
import SubscribedStocks from './pages/SubcribedStocks'
import Signup from './pages/Signup';
import Login from './pages/Login';
import Navbar from './components/Navbar';
// import Dashboard from './pages/Dashboard';

function App() {
  const {user} = useAuthContext()
  const [balance, setBalance] = useState(0);

  useEffect(() => {
    // make API call to retrieve user's balance
    // and update state with the balance
    // for example:
    fetch('/api/user/balance')
      .then(res => res.json())
      .then(data => setBalance(data.balance))
      .catch(err => console.log(err));
  }, []);


  return (
    <div className="App">
      <BrowserRouter>
       <Navbar/>
        <div className="pages">
          <Routes>
            <Route path='/' element={user ? <Dashboard/> : <Navigate to='/login'/>}/>
            <Route path='/subStocks' element={user ? <SubscribedStocks/> : <Navigate to='/login'/>}/>
            <Route path='/signup' element={!user ? <Signup/> : <Navigate to='/'/>}/>
            <Route path='/login' element={!user ? <Login/> : <Navigate to='/'/>}/>
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
