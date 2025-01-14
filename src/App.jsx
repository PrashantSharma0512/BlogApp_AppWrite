import { useEffect, useState } from 'react'

import { useDispatch } from 'react-redux'
import AuthServices from './appWrite/auth'
import { login, logout } from './store/authSlice'
import { Footer, Header } from './component/index'
import { Outlet } from 'react-router-dom'
import Loader from './loader/Loader'

function App() {
  const [loading, setloading] = useState(true)
  const dispatch = useDispatch()

  useEffect(() => {
    AuthServices.getCurrentUser()
      .then((userData) => {
        if (userData) {
          dispatch(login({ userData }))
        } else {
          dispatch(logout())
        }
      })
      .finally(() => setloading(false))
  }, []);



  return !loading ? (
    <div className='min-h-screen flex flex-wrap content-between bg-blue-600'>
      <div className='w-full block'>
        <Header />
        <main className=''>
          <Outlet />
        </main>
        <Footer />
      </div>
    </div>
  ) : (
    <div className='flex w-screen h-screen justify-center items-center relative text-blue-600 font-bold'><div>
    </div>

    </div>
    // <Loader/>
  )
}

export default App
