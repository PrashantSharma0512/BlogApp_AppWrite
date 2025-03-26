import React, { Suspense, lazy } from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { Provider } from 'react-redux'
import store from './store/store.js'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { AuthLayout } from './component/index.js'
import NotFound from './utils/NotFound.jsx'

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
                element: <Suspense fallback={<div>Loading...</div>}><Home /></Suspense>,
            },
            {
                path: "/login",
                element: (
                    <AuthLayout authentication={false}>
                        <Suspense fallback={<div>Loading...</div>}><Login /></Suspense>
                    </AuthLayout>
                ),
            },
            {
                path: "/signup",
                element: (
                    <AuthLayout authentication={false}>
                        <Suspense fallback={<div>Loading...</div>}><Signup /></Suspense>
                    </AuthLayout>
                ),
            },
            {
                path: "/all-posts",
                element: (
                    <AuthLayout authentication>
                        <Suspense fallback={<div>Loading...</div>}><AllPost /></Suspense>
                    </AuthLayout>
                ),
            },
            {
                path: "/add-post",
                element: (
                    <AuthLayout authentication>
                        <Suspense fallback={<div>Loading...</div>}><AddPost /></Suspense>
                    </AuthLayout>
                ),
            },
            {
                path: "/edit-post/:slug",
                element: (
                    <AuthLayout authentication>
                        <Suspense fallback={<div>Loading...</div>}><EditPost /></Suspense>
                    </AuthLayout>
                ),
            },
            {
                path: "/post/:slug",
                element: <Suspense fallback={<div>Loading...</div>}><Post /></Suspense>,
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
