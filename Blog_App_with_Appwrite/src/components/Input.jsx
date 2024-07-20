import React, { useId } from 'react';

const Input = React.forwardRef(({ label, type = 'text', className = '', placeholder = '', ...props }, ref) => {
  const id = useId();

  return (
    <div className='w-full mb-4'>
      {label && (
        <label
          className='block text-sm font-medium text-gray-700 mb-1'
          htmlFor={id}
        >
          {label}
        </label>
      )}
      <input
        id={id}
        ref={ref}
        type={type}
        className={`block w-full px-3 py-2 text-sm text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary ${className}`}
        placeholder={placeholder}
        {...props}
      />
    </div>
  );
});

export default Input;