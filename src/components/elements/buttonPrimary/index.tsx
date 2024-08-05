import React from 'react'

type Props = {
    children?: React.ReactNode
    onClick?: () => void
    className?: string
    type?: 'string'
}

const ButtonPrimary = ({ children, onClick, className }: Props) => {
    return (
        <button className={`bg-primary  text-white  ${className}`} onClick={onClick}  >
            {children}
        </button >
    )
}

export default ButtonPrimary