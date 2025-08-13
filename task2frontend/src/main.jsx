import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import ThemeProvider from "./context/ThemeProvider.jsx";
import { AuthProvider } from "./context/AuthContext";
import { AppProvider } from "./context/AppContext.jsx";
import './index.css'
import App from './App.jsx'
import { ToastContainer } from "react-toastify";
import "react-toastify/ReactToastify.css"

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AppProvider>
      <AuthProvider>
        <ThemeProvider>
          <App />
          <ToastContainer
            position="top-right"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick={false}
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="colored"
            style={{ marginTop: "10vh" }}
          />
        </ThemeProvider>
      </AuthProvider>
    </AppProvider>
  </StrictMode>
)
