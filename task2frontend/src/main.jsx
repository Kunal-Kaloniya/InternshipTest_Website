import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import ThemeProvider from "./context/ThemeProvider.jsx";
import { AuthProvider } from "./context/AuthContext";
import { AppProvider } from "./context/AppContext.jsx";
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AppProvider>
      <AuthProvider>
        <ThemeProvider>
          <App />
        </ThemeProvider>
      </AuthProvider>
    </AppProvider>
  </StrictMode>
)
