import {BrowserRouter, Routes, Route} from 'react-router-dom'

import Stocks from './pages/Stocks';
import ViewStocks from './pages/ViewStocks';
import Navbar from './components/Navbar';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
       <Navbar/>
        <div className="pages">
          <Routes>
            <Route path='/' element={<Stocks/>}/>
            <Route path='/viewstocks' element={<ViewStocks/>}/>
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
