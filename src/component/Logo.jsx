import React from 'react'
import { SiHelpscout } from "react-icons/si";
const Logo = ({ className = "" }) => {
  return (
    <div className={`group flex items-center justify-center p-2 rounded-2xl bg-gradient-to-tr from-primary to-primary/60 shadow-lg shadow-primary/20 hover:scale-110 transition-all duration-500 ${className}`}>
      <SiHelpscout size={24} className="text-primary-foreground group-hover:rotate-12 transition-transform duration-500" />
    </div>
  )
}

export default Logo