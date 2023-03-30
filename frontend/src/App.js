import {BrowserRouter, Routes, Route} from 'react-router-dom'

import Stocks from './pages/Stocks';
import ViewStocks from './pages/ViewStocks';
import Signup from './pages/Signup';
import Login from './pages/Login';
import Navbar from './components/Navbar';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
       <Navbar/>
        <div className="pages">
          <Routes>
            <Route path='/' element={<Stocks/>}/>
            <Route path='/signup' element={<Signup/>}/>
            <Route path='/login' element={<Login/>}/>
            <Route path='/viewstocks' element={<ViewStocks/>}/>
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
