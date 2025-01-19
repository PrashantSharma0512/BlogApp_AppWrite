import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import AuthServices from './appWrite/auth'
import { login, logout } from './store/authSlice'
import { Footer, Header } from './component/index'
import { Outlet } from 'react-router-dom'
import Loader from './utils/Loader'

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
    <div className='min-h-screen flex content-between bg-zinc-200'>
      <div className='w-full flex flex-col justify-between'>
        <Header />
        <main className=''>
          <Outlet />
        </main>
        <Footer />
      </div>
    </div>
  ) : (
    <Loader />
  )
}

export default App
