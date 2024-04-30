import './App.css'
import {
	BrowserRouter as Router,
	Routes,
	Route,
} from 'react-router-dom';

import HomePage from './pages/home'
import ErrorPage from './pages/error'
import Profile from './pages/profile'
import Blog from './pages/blog'
import NewBlog from './pages/newBlog'

function App() {

	return (
		<>
			<Router>
				<Routes>
					<Route path="/" element={<HomePage />} />
					<Route path="/profile/:userId" element={<Profile />} />
					<Route path="/profile/:userId/blog/:blogId" element={<Blog />} />
					<Route path="/profile/:userId/blog/-1" element={<NewBlog />} />
					<Route path="*" element={<ErrorPage />} />
				</Routes>
			</Router>
		</>
	)
}

export default App
