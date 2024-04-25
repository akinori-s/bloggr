import './App.css'
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
} from 'react-router-dom';

import HomePage from './pages/home'
import ErrorPage from './pages/error'
import Profile from './pages/profile'

function App() {

	return (
		<>
			<Router>
				<Routes>
					<Route path="/" element={<HomePage></HomePage>}></Route>
					<Route path="/profile">
						<Route path=':userId' element={<Profile></Profile>}></Route>
					</Route>
					<Route path="/*" element={<ErrorPage></ErrorPage>}></Route>
				</Routes>
			</Router>
		</>
	)
}

export default App
