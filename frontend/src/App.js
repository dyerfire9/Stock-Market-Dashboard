import {BrowserRouter, Routes, Route, Navigate} from 'react-router-dom'
import { useAuthContext } from "./hooks/useAuthContext"

// Import all pages
import Dashboard from './pages/Dashboard';
import SubscribedStocks from './pages/SubcribedStocks'
import Signup from './pages/Signup';
import Login from './pages/Login';
import Navbar from './components/Navbar';

// Render all pages
function App() {
  const {user} = useAuthContext()

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
