import {BrowserRouter, Routes, Route} from 'react-router-dom'

import Stocks from './pages/Stocks';
import Portfolio from './pages/Portfolio';
import Navbar from './components/Navbar';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
       <Navbar/>
        <div className="pages">
          <Routes>
            <Route path='/' element={<Stocks/>}/>
            <Route path='/portfolio' element={<Portfolio/>}/>
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
