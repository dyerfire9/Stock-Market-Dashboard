import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { StocksContextProvider } from './context/StockContext'
import { SubStocksContextProvider } from './context/SubStockContext'

import { AuthContextProvider } from './context/AuthContext'
import { UsersContextProvider } from './context/UsersContext'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <AuthContextProvider>
    <UsersContextProvider>
      <SubStocksContextProvider>
        <StocksContextProvider>
          <App />
        </StocksContextProvider>
      </SubStocksContextProvider>
    </UsersContextProvider>
  </AuthContextProvider>
);

