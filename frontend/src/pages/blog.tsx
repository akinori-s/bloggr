import '../App.css'
import { useEffect, useState } from 'react';
import useFetch from '../hooks/useFetch'
import { User, Blogs } from '../types/apiTypes'
import { useParams, Link } from 'react-router-dom'
import ErrorPage from './error'
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"

function Blog() {

	const { userId, blogId } = useParams();
	const [editMode, setEditMode] = useState(false);
	const [title, setTitle] = useState('');
	const [content, setContent] = useState('');
	const [editedTitle, setEditedTitle] = useState('');
	const [editedContent, setEditedContent] = useState('');


	// Fetch user data
	const {
		data: userData,
		loading: userLoading,
		error: userError,
	} = useFetch<User>(`/${userId}/profile`, 'GET');

	// Fetch blag data
	const {
		data: blogData,
		// loading: blogLoading,
		// error: blogError,
	} = useFetch<Blogs>(`/${userId}/blog/${blogId}`, 'GET');

	useEffect(() => {
		if (blogData) {
			setTitle(blogData.title);
			setContent(blogData.content);
		}
	}, [blogData]);

	if (userLoading) return <div>Loading...</div>;
	if (userError) {
		if (userError.status === 404) return <ErrorPage />;
		return <div>Error: {userError.message}</div>;
	}

  // This effect resets the height to 'auto' to correctly calculate the new scroll height
  // if the content length decreases
  const autoResizeTextarea = (event: any) => {
    const textarea = event.target;
    textarea.style.height = 'auto';  // Reset height to recalculate
    textarea.style.height = `${textarea.scrollHeight}px`;  // Set new height based on content
  };

	const handleTitleChange = (event: any) => {
		setEditedTitle(event.target.value);
	};

	const handleContentChange = (event: any) => {
		setEditedContent(event.target.value);
		autoResizeTextarea(event);
	};

	const handleEditModeChange = () => {
		if (editMode) {
			setTitle(editedTitle);
			setContent(editedContent);

			const requestOptions: RequestInit = {
				method: 'PATCH',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
          id: Number(blogId),
					title: editedTitle,
					content: editedContent,
          user_id: Number(userId),
				} as unknown as Blogs),
				credentials: 'include'
			};

			const BASE_URL: string = 'http://localhost:8080/api';
			const execPatch = async () => {
				try {
					await fetch(BASE_URL.concat(`/${userId}/blog`, '/'), requestOptions);
				} catch (error: any | Error) {
					alert('Update failed.');
				}
			}
			execPatch();
		} else {
			setEditedTitle(title);
			setEditedContent(content);
		}
		setEditMode(!editMode);
	}

  const handleCancel = () => {
    setEditMode(false);
  };

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
					<Link to={`/profile/${userId}`}>
						<h1 className='text-5xl fw-bold text-body-emphasis pb-4'>{userData?.blog_title}</h1>
					</Link>
					<div className="col-lg-6 mx-auto">
						<p className="lead">{userData?.blog_subtitle}</p>
					</div>
				</div>
			</div>

			<main className='container py-5'>
        <Breadcrumb className='mb-4'>
          <BreadcrumbList>
            <BreadcrumbItem>
              <Link to={`/`}></Link>
              <BreadcrumbLink href="/">Home</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <Link to={`/profile/${userId}`}></Link>
              <BreadcrumbLink href={`/profile/${userId}`}>{userData?.blog_title}</BreadcrumbLink>
            </BreadcrumbItem> 
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>{title}</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
				<div className="flex pb-3 item-center">
					{editMode ? (
						<input
              type="text"
              value={editedTitle}
              onChange={handleTitleChange}
              maxLength={254}
              placeholder={'Title'}
              className="form-control text-2xl fw-bold text-body-emphasis"
            />
					) : (
						<h1 className='text-2xl fw-bold text-body-emphasis'>{title}</h1>
					)}
        {editMode ? (
          <>
            <button type="button" className="btn btn-primary ml-2" onClick={handleEditModeChange}>Save</button>
            <button type="button" className="btn btn-secondary ml-2" onClick={handleCancel}>Cancel</button>
          </>
        ) : (
          <button type="button" className="btn btn-primary ml-auto" onClick={handleEditModeChange}>Edit</button>
        )}
				</div>
				{editMode ? (
						<textarea value={editedContent} onChange={handleContentChange} placeholder={'Write your blog here'}
							className="form-control grid sm:grid-cols-1 xl:grid-cols-2 gap-3 min-h-64 max-h-96 break-words whitespace-pre-wrap"
						/>
					) : (
						<div className='grid sm:grid-cols-1 xl:grid-cols-2 gap-3 break-words whitespace-pre-wrap'>
							{content}
						</div>
					)}
			</main>
		</>
	)
}

export default Blog;
