import React, { useId } from 'react'

const Input = React.forwardRef(({ label, type = 'text', classname = '', placeholder = '', ...props }, ref) => (
    
    <div className='w-full'>
        {label && <label
            className='inline-block mb-1 pl-1'
            htmlFor={useId()}>
            {label}
        </label>}

        <input
            ref={ref}
            type={type}
            className={`w-full p-2 pl-10 text-sm text-gray-700 ${classname}`}
            placeholder={placeholder}
            {...props}
        />
    </div>
))

export default Input
