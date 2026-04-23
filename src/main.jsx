import React, { Suspense, lazy } from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { Provider } from 'react-redux'
import store from './store/store.js'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { AuthLayout } from './component/index.js'
import NotFound from './utils/NotFound.jsx'

import Loader from './utils/PulseLoader.jsx'

// Lazy load components
const Home = lazy(() => import('./pages/Home.jsx'));
const AddPost = lazy(() => import('./pages/AddPost.jsx'));
const Signup = lazy(() => import('./pages/Signup.jsx'));
const EditPost = lazy(() => import('./pages/EditPost.jsx'));
const Post = lazy(() => import('./pages/Post.jsx'));
const Login = lazy(() => import('./pages/Login.jsx'));
const AllPost = lazy(() => import('./pages/AllPost.jsx'));

const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        children: [
            {
                path: "/",
                element: <Suspense fallback={<div className="flex h-[70vh] items-center justify-center"><Loader /></div>}><Home /></Suspense>,
            },
            {
                path: "/login",
                element: (
                    <AuthLayout authentication={false}>
                        <Suspense fallback={<div className="flex h-[70vh] items-center justify-center"><Loader /></div>}><Login /></Suspense>
                    </AuthLayout>
                ),
            },
            {
                path: "/signup",
                element: (
                    <AuthLayout authentication={false}>
                        <Suspense fallback={<div className="flex h-[70vh] items-center justify-center"><Loader /></div>}><Signup /></Suspense>
                    </AuthLayout>
                ),
            },
            {
                path: "/all-posts",
                element: (
                    <AuthLayout authentication>
                        <Suspense fallback={<div className="flex h-[70vh] items-center justify-center"><Loader /></div>}><AllPost /></Suspense>
                    </AuthLayout>
                ),
            },
            {
                path: "/add-post",
                element: (
                    <AuthLayout authentication>
                        <Suspense fallback={<div className="flex h-[70vh] items-center justify-center"><Loader /></div>}><AddPost /></Suspense>
                    </AuthLayout>
                ),
            },
            {
                path: "/edit-post/:slug",
                element: (
                    <AuthLayout authentication>
                        <Suspense fallback={<div className="flex h-[70vh] items-center justify-center"><Loader /></div>}><EditPost /></Suspense>
                    </AuthLayout>
                ),
            },
            {
                path: "/post/:slug",
                element: <Suspense fallback={<div className="flex h-[70vh] items-center justify-center"><Loader /></div>}><Post /></Suspense>,
            }
        ],
    },
    {
        path: "*",
        element: <NotFound />,
    }
])

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <Provider store={store}>
            <RouterProvider router={router} />
        </Provider>
    </React.StrictMode>,
)
