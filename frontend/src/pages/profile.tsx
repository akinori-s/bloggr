import '../App.css'

import useFetch from '../hooks/useFetch'
import { User, Blogs } from '../types/apiTypes'
import BlogCard from '../components/blogCard'
import EmptyBlogsPlaceholder from '../components/emptyBlogsPlaceholder'
import { useParams, Link } from 'react-router-dom'
import ErrorPage from './error'

function Profile() {

	const { userId } = useParams();

	// Fetch user data
	const {
		data: userData,
		loading: userLoading,
		error: userError,
	} = useFetch<User>(`/${userId}/profile`, 'GET');

	// Fetch user's posts
	const {
		data: blogData,
		loading: blogLoading,
		error: blogError,
    fetchData: blogsRefetch,
	} = useFetch<Blogs[]>(`/${userId}/blog`, 'GET');

	if (userLoading) return <div>Loading...</div>;
	if (userError) {
		if (userError.status === 404) return <ErrorPage />;
		return <div>Error: {userError.message}</div>;
	}

	const displayBlogs = () => {
		if (blogLoading) {
			return <div>Loading...</div>;
		}
		if (blogError) {
			return <div>Error...</div>;
		}
		if (blogData?.length === 0 || blogData === undefined || blogData === null) {
			return <EmptyBlogsPlaceholder/>;
		}
		return blogData?.map((blog) => (
			<BlogCard key={blog.id} id={blog.id} title={blog.title} subtitle={blog.content} datetimePublished={blog.created_at} handleDelete={handleDelete}/>
		))
	}

  const handleDelete = (id: number) => {
    const deleteRequestOptions: RequestInit = {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include'
    };

    const BASE_URL: string = 'http://localhost:8080/api';
    const execDelete = async () => {
      try {
        await fetch(BASE_URL.concat(`/${userId}/blog/${id}`, '/'), deleteRequestOptions);
      } catch (error: any | Error) {
        alert('Failed to delete blog.');
        return ;
      }
      blogsRefetch();
    }
    execDelete();
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

			<div className='container max-w-full mx-0 w-full bg-lime-300'>
				<div className="container px-4 py-5 text-center">
					<img src="" alt="" />
					<h1 className='text-5xl fw-bold text-body-emphasis pb-4'>{userData?.blog_title}</h1>
					<div className="col-lg-6 mx-auto">
						<p className="lead">{userData?.blog_subtitle}</p>
					</div>
				</div>
			</div>

			<main className='container py-5'>
				<div className="flex pb-3 item-center">
					<h1 className='text-2xl fw-bold text-body-emphasis'>Articles</h1>
					<Link to={`blog/-1`} className="btn btn-primary ml-auto">New blog</Link>
				</div>
				<div className='grid sm:grid-cols-1 xl:grid-cols-2 gap-3'>
					{displayBlogs()}
				</div>
			</main>
		</>
	)
}

export default Profile;
