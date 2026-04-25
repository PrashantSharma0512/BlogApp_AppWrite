import React, { useId } from 'react'

const Select = ({
    options,
    label,
    className,
    ...props
}, ref) => {
    const id = useId();
    return (
        <div className='w-full space-y-2'>
            {label && (
                <label 
                    className='block ml-1 text-sm font-semibold text-muted-foreground tracking-wide uppercase'
                    htmlFor={id}
                >
                    {label}
                </label>
            )}
            <select
                ref={ref}
                id={id}
                {...props}
                className={`
                    px-5 py-4 rounded-2xl bg-white/5 text-white outline-none 
                    focus:ring-2 focus:ring-primary/50 focus:bg-white/[0.08] 
                    duration-300 border border-white/5 w-full 
                    transition-all active:scale-[0.99] appearance-none cursor-pointer
                    ${className}
                `}
            >
                {options?.map((option) => (
                    <option
                        className='bg-secondary text-white'
                        key={option}
                        value={option}
                    >
                        {option}
                    </option>
                ))}
            </select>
        </div>
    )
}

export default React.forwardRef(Select)