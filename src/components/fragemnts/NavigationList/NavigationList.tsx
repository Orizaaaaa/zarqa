import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'

type Props = {
    pathname: string,
    title: string,
    icon: any,
}

const NavigationList = ({ pathname, title, icon, }: Props) => {
    const pathnames = usePathname();
    return (
        <li>
            <Link
                href={`${pathname}`}
                className={`group relative flex items-center gap-2.5 rounded-lg px-4 py-2 font-medium text-bodydark1 duration-300 
                 ease-in-out bg-primary ${pathnames.includes(pathname) &&
                    "bg-graydark dark:bg-meta-4"
                    }`}
            >
                {icon}
                {title}
            </Link>
        </li>
    )
}

export default NavigationList