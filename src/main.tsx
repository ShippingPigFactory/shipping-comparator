import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
// import './index.css' // もしあれば消してもOK、App.scssでカバー済み

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)