import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { StocksContextProvider } from './context/StockContext'
import { AuthContextProvider } from './context/AuthContext'
import { UsersContextProvider } from './context/UsersContext'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <AuthContextProvider>
    <UsersContextProvider>
      <StocksContextProvider>
        <App />
      </StocksContextProvider>
    </UsersContextProvider>
  </AuthContextProvider>
);

