import React from 'react'
import { useDispatch } from 'react-redux'
import AuthService from '../../appWrite/auth';
import { logout } from '../../store/authSlice';
const LogoutBtn = () => {

  const dispatch = useDispatch();
  const logoutHandler = () => {
    AuthService.logout().then(() => {
      dispatch(logout())
    })
  }


  return (
    <button className='p-2 text-white'
      onClick={logoutHandler}>LogoutBtn</button>
  )
}

export default LogoutBtn