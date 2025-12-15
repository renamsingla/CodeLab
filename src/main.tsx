// import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { CodeProvider } from './context/CodeProvider.tsx'

createRoot(document.getElementById('root')!).render(
  <CodeProvider>
    <App />
  </CodeProvider>,
)
