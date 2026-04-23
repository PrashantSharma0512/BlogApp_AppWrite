import React from 'react'

const Button = ({
    children,
    type = 'button',
    variant = 'primary', // primary, secondary, outline, ghost
    className = '',
    disabled = false,
    ...props
}) => {
  const variants = {
    primary: 'bg-blue-600 text-white hover:bg-blue-500 shadow-lg shadow-blue-600/20',
    secondary: 'bg-white text-black hover:bg-zinc-200 shadow-xl shadow-white/5',
    outline: 'bg-transparent border border-white/10 text-white hover:bg-white/5',
    ghost: 'bg-transparent text-zinc-400 hover:text-white hover:bg-white/5',
    glass: 'glass-dark border border-white/5 text-white hover:bg-white/10'
  }

  const activeVariant = variants[variant] || variants.primary

  return (
    <button 
      type={type}
      disabled={disabled}
      className={`
        relative px-6 py-3 rounded-2xl font-bold transition-all duration-300 
        active:scale-95 disabled:opacity-50 disabled:pointer-events-none
        ${activeVariant} ${className}
      `} 
      {...props} 
    >
      {children}
    </button>
  )
}

export default Button