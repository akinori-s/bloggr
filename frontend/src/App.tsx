import './App.css'

import BlogCard from './components/blogCard'

function App() {

	const notifications = [
		{
			title: "Your call has been confirmed.",
			subtitle: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.", 
			datetimePublished: new Date(),
		},
		{
			title: "You have a new message!",
			subtitle: "smoke smoke smoke", 
			datetimePublished: new Date(),
		},
		{
			title: "Your subscription is expiring soon!",
			subtitle: "smoke smoke smoke", 
			datetimePublished: new Date(),
		},
	]

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
							<li><a href="#" className="nav-link px-2 text-white">Pricing</a></li>
							<li><a href="#" className="nav-link px-2 text-white">FAQs</a></li>
							<li><a href="#" className="nav-link px-2 text-white">About</a></li>
						</ul>
						<div className="text-end">
							<button type="button" className="btn btn-outline-light me-2">Login</button>
							<button type="button" className="btn btn-warning">Sign-up</button>
						</div>
					</div>
				</div>
			</header>
		<div className='container max-w-full mx-0 w-full bg-lime-300'>
		<div className="container px-4 py-5 text-center">
			<img src="" alt="" />
			<h1 className='text-5xl fw-bold text-body-emphasis pb-4'>Centered hero</h1>
			<div className="col-lg-6 mx-auto">
			<p className="lead">Quickly design and customize responsive mobile-first sites with Bootstrap, the world's most popular front-end open source toolkit, featuring Sass variables and mixins, responsive grid system, extensive prebuilt components, and powerful JavaScript plugins.</p>
			{/* <div className="d-grid gap-2 d-sm-flex justify-content-sm-center">
				<button type='button' className='btn btn-primary btn-lg px-4 gap-3'>test1</button>
				<button type='button' className='btn btn-outline-secondary btn-lg px-4'>test2</button>
			</div> */}
			</div>
		</div>
		</div>

		<main className='container py-5'>
			<h1 className='text-2xl fw-bold text-body-emphasis pb-3'>Articles</h1>
			<div className='grid sm:grid-cols-1 xl:grid-cols-2 gap-3'>
				{notifications.map((notification) => (
					<BlogCard title={notification.title} subtitle={notification.subtitle} datetimePublished={notification.datetimePublished} />
				))}
				<BlogCard title="William Smith" subtitle = "tesasdf111" datetimePublished = {new Date()} />
			</div>
		</main>
		</>
	)
}

export default App
