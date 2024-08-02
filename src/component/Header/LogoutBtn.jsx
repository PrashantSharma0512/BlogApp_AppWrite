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
  console.log(typeof logoutHandler);

  return (
    <button className='p-4 bg-red-700 border-blue-600-1'
      onClick={logoutHandler}>LogoutBtn</button>
  )
}

export default LogoutBtn