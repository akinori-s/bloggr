import React from 'react';

// HomePage.tsx
const HomePage: React.FC = () => {
	return (
		<>
			<header className="p-3 bg-dark">
				<div className="container">
					<div className="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start">
						<a href="/" className='d-flex align-items-center mb-2 mb-lg-0 text-white text-decoration-none'>
							<i className="bi bi-bootstrap me-3 text-2xl tracking-wide">loggr</i>
						</a>
						<ul className='nav col-12 col-lg-auto me-lg-auto mb-2 justify-content-center mb-md-0'>
							<li><a href="#" className="nav-link px-2 text-white">Home</a></li>
							<li><a href="#" className="nav-link px-2 text-white">Features</a></li>
							<li><a href="#" className="nav-link px-2 text-white">Profile</a></li>
							<li><a href="#" className="nav-link px-2 text-white">Blog</a></li>
						</ul>
						<div className="text-end">
							<button type="button" className="btn btn-outline-light me-2">Login</button>
							<button type="button" className="btn btn-warning">Sign-up</button>
						</div>
					</div>
				</div>
			</header>

			<main className="container max-w-full mx-auto w-full bg-lime-300 text-center py-5">
				<h1 className="text-5xl font-bold text-black mb-4">Welcome to Loggr!</h1>
				<p className="text-xl mb-5">Discover the features we offer and learn more about how we can help you keep track of your projects.</p>
				<div className="flex justify-center">
					<a href="/features" className="btn btn-primary px-5 py-2">Learn More</a>
				</div>
			</main>
		</>
	);
};

export default HomePage;
