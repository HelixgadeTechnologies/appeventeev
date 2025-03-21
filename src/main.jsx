import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import "@fontsource/inter";
import { ChakraProvider } from "@chakra-ui/react"
import UserAuthProvider from './contexts/UserAuthContext.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ChakraProvider>
    <UserAuthProvider>
    <App />
    </UserAuthProvider>
    </ChakraProvider>
  </StrictMode>,
)
