// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import './App.css'

// import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
// import { Input } from "@/components/ui/input"
// import { Label } from "@/components/ui/label"
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select"

function App() {

	const notifications = [
		{
		  title: "Your call has been confirmed.",
		  description: "1 hour ago",
		},
		{
		  title: "You have a new message!",
		  description: "1 hour ago",
		},
		{
		  title: "Your subscription is expiring soon!",
		  description: "2 hours ago",
		},
	  ]



  return (
    <>
      <header className="p-3 bg-dark">
        <div className="container">
          <div className="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start">
            <a href="/" className='d-flex align-items-center mb-2 mb-lg-0 text-white text-decoration-none'>
              <i className="bi bi-bootstrap me-2 text-2xl"></i>
              {/* <svg className='bi me-2' width='40' height='32' role='img' aria-label='Bootstrap'>
              </svg> */}
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
      <div className="container px-4 py-5 my-5 text-center">
        <img src="" alt="" />
        <h1 className='display-5 fw-bold text-body-emphasis'>Centered hero</h1>
        <div className="col-lg-6 mx-auto">
          <p className="lead mb-4">Quickly design and customize responsive mobile-first sites with Bootstrap, the world’s most popular front-end open source toolkit, featuring Sass variables and mixins, responsive grid system, extensive prebuilt components, and powerful JavaScript plugins.</p>
          <div className="d-grid gap-2 d-sm-flex justify-content-sm-center">
            <button type='button' className='btn btn-primary btn-lg px-4 gap-3'>test1</button>
            <button type='button' className='btn btn-outline-secondary btn-lg px-4'>test2</button>
          </div>
        </div>
      </div>

	  
	  <main className='container grid sm:grid-cols-1 xl:grid-cols-2 gap-3'>
		<div className='col-span-1 rounded-lg border p-3 text-left text-sm transition-all hover:bg-accent bg-muted'>
			<div className='flex flex-col w-full gap-3'>
				<div className='flex items-center  text-lg'>
					<div className='font-semibold'>William Smith</div>
					<div className='ml-auto text-xs text-foreground'>5 months ago</div>
				</div>
				<div className='line-clamp-3 text-md font-medium'>
				Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.
				</div>
				<div className='line-clamp-3 text-xs font-medium text-right'>Read more...</div>
			</div>
		</div>
		<div className='col-span-1 rounded-lg border p-3 text-left text-sm transition-all hover:bg-accent bg-muted'>
			<div className='flex flex-col w-full gap-3'>
				<div className='flex items-center'>
					<div className='font-semibold text-lg'>William Smith</div>
					<div className='ml-auto text-xs text-foreground'>5 months ago</div>
				</div>
				<div className='line-clamp-3 text-md font-medium'>
				Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.
				</div>
				<div className='line-clamp-3 text-xs font-medium text-right'>Read more...</div>
			</div>
		</div>
	  </main>

	  <Card className={cn("w-[380px]", "container w-full")}>
      <CardHeader>
        <CardTitle>Notifications</CardTitle>
        <CardDescription>You have 3 unread messages.</CardDescription>
      </CardHeader>
      <CardContent className="grid gap-4">
	  Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.
      </CardContent>
      <CardFooter>
		Read More..
      </CardFooter>
    </Card>

      <main className='container'>
        <div className="row">
          <div className="row g-0 border rounded overflow-hidden flex-md-row mb-4 shadow-sm h-md-250 position-relative">
            <div className="col p-4 d-flex flex-column position-static">
              <strong className='d-inline-block mb-2 text-primary-emphasis'>test</strong>
              <h3 className='mb-0'>test</h3>
              <div className="mb-1 text-body-secondary">Nov 12</div>
              <p className='card-text mb-auto'></p>

            </div>
            <div className="col-auto d-none d-lg-block">
              <svg className='bd-placeholder-img' width='200' height='150' xmlns='http://www.w3.org/2000/svg' role='img' aria-label='Placeholder: Thumbnail' preserveAspectRatio='xMidYMid slice' focusable='false'>
                <title>Placeholder</title>
                <rect width='100%' height='100%' fill='#55595c'></rect>
                <text x='50%' y='50%' fill='#eceeef' dy='.3em'>Thumbnail</text>
              </svg>

            </div>
          </div>
        </div>
        <div className="hidden items-start justify-center gap-6 rounded-lg p-8 md:grid lg:grid-cols-2 xl:grid-cols-3">
          <div className='col-span-1 grid items-start gap-6 lg:col-span-1 rounded-lg border p-3 text-left text-sm transition-all hover:bg-accent bg-muted'>
            <div className='flex w-full flex-col gap-1'>
              <div className='flex items-center'>
                <div className='fflex items-center gap-2'>
                  <div className='font-semibold'>William Smith</div>
                </div>
                <div className='ml-auto text-xs text-foreground'>5 months ago</div>
              </div>
              <div className='text-xs font-medium'>
                aaaaaaaaaaaaaa
              </div>
            </div>
            <div className='line-clamp-2 text-xs text-muted-foreground'>
              Hi, let's have a meeting tomorrow to discuss the project. I've been reviewing the project details and have some ideas I'd like to share. It's crucial that we align on our next steps to ensure the project's success.
            </div>
          </div>
          <button className='col-6 flex flex-col items-start gap-2 rounded-lg border p-3 text-left text-sm transition-all hover:bg-accent bg-muted'>
            <div className='flex w-full flex-col gap-1'>
              <div className='flex items-center'>
                <div className='fflex items-center gap-2'>
                  <div className='font-semibold'>William Smith</div>
                </div>
                <div className='ml-auto text-xs text-foreground'>5 months ago</div>
              </div>
              <div className='text-xs font-medium'>
                aaaaaaaaaaaaaa
              </div>
            </div>
            <div className='line-clamp-2 text-xs text-muted-foreground'>
              Hi, let's have a meeting tomorrow to discuss the project. I've been reviewing the project details and have some ideas I'd like to share. It's crucial that we align on our next steps to ensure the project's success.
            </div>
          </button>
          <button className='col-6 flex flex-col items-start gap-2 rounded-lg border p-3 text-left text-sm transition-all hover:bg-accent bg-muted'>
            <div className='flex w-full flex-col gap-1'>
              <div className='flex items-center'>
                <div className='font-semibold'>William Smith</div>
                <div className='ml-auto text-xs text-foreground'>5 months ago</div>
              </div>
              <div className='text-xs font-medium'>
                aaaaaaaaaaaaaa
              </div>
            </div>
            <div className='line-clamp-2 text-xs text-muted-foreground'>
              Hi, let's have a meeting tomorrow to discuss the project. I've been reviewing the project details and have some ideas I'd like to share. It's crucial that we align on our next steps to ensure the project's success.
            </div>
          </button>
        </div>
      </main>
      <main className='container'>
        <h1>playground</h1>
		<div className="grid gap-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
			<div className="grid col-span-2 gap-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
				<div className="col-span-1 bg-slate-300 text-center border-2 rounded-md border-indigo-500/75">col-span-1</div>
				<div className="col-span-2 row-span-2 bg-slate-300 text-center border-2 rounded-md border-indigo-500/75">col-span-1</div>
				<div className="col-span-1 bg-slate-300 text-center border-2 rounded-md border-indigo-500/75">col-span-1</div>
				<div className="col-span-1 bg-slate-300 text-center border-2 rounded-md border-indigo-500/75">col-span-1</div>
				<div className="col-span-2 bg-slate-300 text-center border-2 rounded-md border-indigo-500/75">col-span-1</div>
			</div>
			<h1 className='bg-green-300 text-center border-4 border-green-500'>test12</h1>
		</div>
        

      </main>
        {/* <Card className="w-[350px]">
          <CardHeader>
            <CardTitle>Create project</CardTitle>
            <CardDescription>Deploy your new project in one-click.</CardDescription>
          </CardHeader>
          <CardContent>
            <form>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
              <Label htmlFor="name">Name</Label>
              <Input id="name" placeholder="Name of your project" />
              </div>
              <div className="flex flex-col space-y-1.5">
              <Label htmlFor="framework">Framework</Label>
              <Select>
                <SelectTrigger id="framework">
                <SelectValue placeholder="Select" />
                </SelectTrigger>
                <SelectContent position="popper">
                <SelectItem value="next">Next.js</SelectItem>
                <SelectItem value="sveltekit">SvelteKit</SelectItem>
                <SelectItem value="astro">Astro</SelectItem>
                <SelectItem value="nuxt">Nuxt.js</SelectItem>
                </SelectContent>
              </Select>
              </div>
            </div>
            </form>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button variant="outline">Cancel</Button>
            <Button>Deploy</Button>
          </CardFooter>
        </Card> */}

    </>
  )
}

export default App
