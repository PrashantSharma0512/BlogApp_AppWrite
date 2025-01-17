import React from 'react'
import { useDispatch } from 'react-redux'
import AuthService from '../../appWrite/auth';
import { logout } from '../../store/authSlice';
import { IoMdLogOut } from "react-icons/io";
const LogoutBtn = () => {

  const dispatch = useDispatch();
  const logoutHandler = () => {
    AuthService.logout().then(() => {
      dispatch(logout())
    })
  }


  return (
    <>
    <button className='p-2 '
      onClick={logoutHandler}>
        <IoMdLogOut  size={30}/>
        {/* LogoutBtn */}
        </button>
    </>
  )
}

export default LogoutBtn