import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { Toaster } from 'react-hot-toast';
import {
  RecoilRoot,
} from 'recoil';
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RecoilRoot>
      <App />
    </RecoilRoot>
    <Toaster
      position="top-right"
      reverseOrder={false}
    />
  </React.StrictMode>,
)
