import React from 'react'
import { SiHelpscout } from "react-icons/si";
const Logo = ({ className = "" }) => {
  return (
    <div className={`group flex items-center justify-center p-2 rounded-2xl bg-gradient-to-tr from-blue-600 to-indigo-600 shadow-lg shadow-blue-600/20 hover:scale-110 transition-all duration-500 ${className}`}>
      <SiHelpscout size={24} className="text-white group-hover:rotate-12 transition-transform duration-500" />
    </div>
  )
}

export default Logo