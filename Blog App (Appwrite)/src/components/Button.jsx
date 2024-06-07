import React from 'react'

function Button({
    btnText,
    type = 'button',
    className = '',
    bgColor = "bg-green-600",
    textColor = "text-gray-400",
    hoverColor = "hover:bg-green-700",
    ...props
}) {
    return (
        <button className={`px-4 py-2 rounded-lg ${bgColor} ${textColor} ${className}`} {...props}>
            {btnText}
        </button>
    )
}

export default Button
