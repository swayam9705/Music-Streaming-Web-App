import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App.jsx'

// Context API
import { ContextProvider } from "./ContextManager.jsx"

createRoot(document.getElementById('root')).render(
	<BrowserRouter>
		<ContextProvider>
			<App />
		</ContextProvider>
	</BrowserRouter>
)
