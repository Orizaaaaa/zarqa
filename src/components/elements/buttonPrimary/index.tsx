import React from 'react'

type Props = {
    children?: React.ReactNode
    onClick?: () => void
    className?: string
    type?: 'string'
}

const ButtonPrimary = ({ children, onClick, className }: Props) => {
    return (
        <button className={`bg-primary px-4 py-2 text-white  ${className}`} onClick={onClick}  >
            {children}
        </button >
    )
}

export default ButtonPrimary