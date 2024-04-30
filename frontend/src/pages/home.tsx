import '../App.css'

import useFetch from '../hooks/useFetch'
import { User } from '../types/apiTypes'
import ProfileCard from '../components/profileCard'
import EmptyBlogsPlaceholder from '../components/emptyBlogsPlaceholder'
import { Link } from "react-router-dom";

// HomePage.tsx
function HomePage() {

	// Fetch user data
	const {
		data: userData,
		loading: userLoading,
		error: userError,
	} = useFetch<User[]>(`/profiles`, 'GET');

	const displayUsers = () => {
		console.log(userData);
		if (userLoading) {
			return <div>Loading...</div>;
		}
		if (userError) {
			return <div>Error...</div>;
		}
		if (userData?.length === 0 || userData === undefined || userData === null) {
			return <EmptyBlogsPlaceholder/>;
		}
		return userData?.map((user) => (
			<Link key={user.id} to={`/profile/${user.id}`} >
				<ProfileCard username={user.username} blogTitle={user.blog_title} />
			</Link>
		))
	}

	return (
		<>
			<header className="p-3 bg-dark">
				<div className="container">
					<div className="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start">
						<Link to="/" className='d-flex align-items-center mb-2 mb-lg-0 text-white text-decoration-none'>
							<i className="bi bi-bootstrap me-3 text-2xl tracking-wide">loggr</i>
						</Link>
						<ul className='nav col-12 col-lg-auto me-lg-auto mb-2 justify-content-center mb-md-0'>
							<li><Link to="/" className="nav-link px-2 text-white">Home</Link></li>
							<li><Link to="/features" className="nav-link px-2 text-white">Features</Link></li>
						</ul>
						<div className="text-end">
							<button type="button" className="btn btn-outline-light me-2">Login</button>
							<button type="button" className="btn btn-warning">Sign-up</button>
						</div>
					</div>
				</div>
			</header>

			<main className="container max-w-full mx-auto w-full bg-lime-300 text-center py-5">
				<h1 className="text-5xl font-bold text-black mb-4">Welcome to <i className="bi bi-bootstrap me-3 tracking-wide">loggr</i>!</h1>
				<p className="text-xl mb-5">Discover the features we offer and learn more about how we can help you keep track of your projects.</p>
				<div className="flex justify-center">
					<Link to="/features" className="btn btn-primary px-5 py-2">Learn More</Link>
				</div>
			</main>

			<main className='container py-5'>
				<div className="flex pb-3 item-center">
					<h1 className='text-2xl fw-bold text-body-emphasis'>Bloggrs</h1>
				</div>
				<div className='grid sm:grid-cols-1 xl:grid-cols-2 gap-3'>
					{displayUsers()}
				</div>
			</main> 
		</>
	);
};

export default HomePage;
