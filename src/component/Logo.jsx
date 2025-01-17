import React from 'react'
import { SiHelpscout } from "react-icons/si";
const Logo = ({children}) => {
  return (
    <div className={`${children}`}><SiHelpscout size={30}/></div>
  )
}

export default Logo