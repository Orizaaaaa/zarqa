import React from 'react'

type Props = {
    children?: React.ReactNode
    onClick?: () => void
    className?: string
    type?: 'string'
}

const ButtonSecondary = ({ children, onClick, className }: Props) => {
    return (
        <button className={`bg-white border-2 border-black px-4 py-2 text-black  ${className}`} onClick={onClick}  >
            {children}
        </button >
    )
}

export default ButtonSecondary