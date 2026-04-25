import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import AuthServices from './appWrite/auth'
import { login, logout } from './store/authSlice'
import { Footer, Header } from './component/index'
import { Outlet } from 'react-router-dom'
import Loader from './utils/Loader'
import { ChakraProvider } from '@chakra-ui/react'

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
    <ChakraProvider>
      <div className='min-h-screen mesh-gradient selection:bg-primary/30'>
        <div className='w-full flex flex-col'>
          <Header />
          <main className='flex-grow animate-in fade-in slide-in-from-bottom-4 duration-1000'>
            <Outlet />
          </main>
          <Footer />
        </div>
      </div>
    </ChakraProvider>
  ) : (
    <div className="min-h-screen bg-background flex items-center justify-center">
      <Loader />
    </div>
  )
}

export default App
