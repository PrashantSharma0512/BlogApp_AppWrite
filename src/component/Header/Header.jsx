import React from 'react'
import { Container, Logo, LogoutBtn } from '../index'
import { useSelector } from 'react-redux'
import { useNavigate, Link } from 'react-router-dom'

const Header = () => {
  const authStatus = useSelector((state) => state.auth.status)
  const navigate = useNavigate()

  const navItems = [
    {
      name: 'Home',
      slug: '/',
      active: true,
    },
    {
      name: "Login",
      slug: '/login',
      active: !authStatus,
    },
    {
      name: 'Signup',
      slug: '/signup',
      active: !authStatus,
    },
    {
      name: "All Posts",
      slug: "/all-posts",
      active: authStatus,
    },
    {
      name: "Add Post",
      slug: "/add-post",
      active: authStatus,
    },
  ]
  return (
    <header className='bg-zinc-200 py-3 shadow-lg'>
      <Container>
        <nav className='flex items-center'>
          <div className='mr-4'>
            <Link to={'/'}>
              <Logo  />
            </Link>
          </div>
          <ul className='flex ml-auto'>
            {navItems.map((item)=>
                item.active ? (
                  <li key={item.name}>
                      <button
                      onClick={()=>navigate(item.slug)}
                      className='inline-block px-6 py-2 duration-200 hover:bg-zinc-500 rounded-full active:bg-neutral-600'
                      >{item.name}</button>
                  </li>
                ): null
            )}
            {
              authStatus && (
                <li>
                  <LogoutBtn/>
                </li>
              )
            }
          </ul>
        </nav>
      </Container>
    </header>
  )
}

export default Header