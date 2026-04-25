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
    primary: 'bg-primary text-primary-foreground hover:bg-primary/90 shadow-lg shadow-primary/20',
    secondary: 'bg-secondary text-secondary-foreground hover:bg-secondary/80 shadow-xl shadow-black/20',
    outline: 'bg-transparent border border-border text-foreground hover:bg-accent hover:text-accent-foreground',
    ghost: 'bg-transparent text-muted-foreground hover:text-foreground hover:bg-accent',
    glass: 'glass-dark border border-white/5 text-foreground hover:bg-white/10'
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