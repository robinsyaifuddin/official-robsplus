
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import ChatBot from './components/ChatBot'

const root = createRoot(document.getElementById("root")!);
root.render(
  <>
    <App />
    <ChatBot />
  </>
);
