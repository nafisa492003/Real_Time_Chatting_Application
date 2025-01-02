import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { Provider } from "react-redux";
import store from "./Store.js";
import { DarkModeProvider } from '../src/Component/NavBar/DarkModeProvider.jsx';
createRoot(document.getElementById('root')).render(
  <Provider store={store}>
  <DarkModeProvider>
      <App />
    </DarkModeProvider>
  </Provider>
)
