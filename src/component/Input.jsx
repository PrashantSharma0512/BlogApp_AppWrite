import React, { useId } from 'react'

const Input = React.forwardRef(({
    label,
    type = 'text',
    className = '',
    id: userProvidedId,
    ...props
}, ref) => {
    const generatedId = useId()
    const finalId = userProvidedId || generatedId

    return (
        <div className='w-full space-y-2'>
            {label && (
                <label 
                    className='block ml-1 text-sm font-semibold text-zinc-400 tracking-wide uppercase'
                    htmlFor={finalId}
                >
                    {label}
                </label>
            )}

            <input
                type={type}
                className={`
                    px-5 py-4 rounded-2xl bg-white/5 text-white outline-none 
                    focus:ring-2 focus:ring-blue-500/50 focus:bg-white/[0.08] 
                    duration-300 border border-white/5 w-full 
                    placeholder:text-zinc-600 font-medium
                    transition-all active:scale-[0.99]
                    ${className}
                `}
                ref={ref}
                {...props}
                id={finalId}
            />
        </div>
    )
})

export default Input