import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.min.css';
import './index.css'

ReactDOM.createRoot(document.getElementById('roota')!).render(
	<React.StrictMode>
		<App />
	</React.StrictMode>,
)
