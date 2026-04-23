import React, { useId } from 'react'

const Input = React.forwardRef(({
    label,
    type = 'text',
    className = '',
    ...props
}, ref) => {
    const id = useId()
    return (
        <div className='w-full'>
            {label && <label className='block mb-1'
                htmlFor={id}

            >{label}</label>}

            <input
                type={type}
                className={`px-4 py-2.5 rounded-xl bg-white/5 text-white outline-none focus:ring-2 focus:ring-white/20 focus:bg-white/10 duration-200 border border-white/10 w-full placeholder:text-zinc-500 ${className}`}
                ref={ref}
                {...props}
                id={id}
            />
        </div>
    )
})

export default Input