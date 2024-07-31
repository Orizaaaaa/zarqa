'use client'
import Link from 'next/link';
import React, { useEffect, useState } from 'react'
import ButtonPrimary from '../../elements/buttonPrimary';
import { navigation } from '@/utils/dataObject';
import { usePathname } from 'next/navigation';
import './navbar.scss'
import { logo1, logo2 } from '@/app/image';
import Image from 'next/image';

type Props = {}

const Navbar = (props: Props) => {
    const pathname = usePathname()
    const [navbarBg, setnavbarBg] = useState(false);
    const [activeSection, setActiveSection] = useState('home');
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);


    const toggleMobileMenu = () => {
        setMobileMenuOpen(!mobileMenuOpen);
    };


    // untuk navbar change
    const changeBackground = () => {
        if (typeof window !== 'undefined') {
            // Check if window is defined before accessing scrollY
            if (window.scrollY >= 80) {
                setnavbarBg(true);
            } else {
                setnavbarBg(false);
            }
        }
    };

    useEffect(() => {
        window.addEventListener('scroll', changeBackground);

        return () => {
            // Cleanup: remove the event listener when the component is unmounted
            window.removeEventListener('scroll', changeBackground);
        };
    }, []);


    useEffect(() => {
        const handleScroll = () => {

            const sections = document.querySelectorAll('section');

            sections.forEach(section => {
                const rect = section.getBoundingClientRect();

                if (rect.top <= 330 && rect.bottom >= 330) {
                    setActiveSection(section.id);
                }
            });
        };

        window.addEventListener('scroll', handleScroll);
        console.log(window);

        return () => {
            window.removeEventListener('scroll', handleScroll);

        };
    }, []);


    return (
        <nav className={`fixed top-0 left-0 py-2.5 w-full z-10  ${navbarBg ? 'navbarbgActive shadow-xl' : ''}`}>
            <div className="container mx-auto flex flex-wrap items-center justify-between ">
                <div className="flex items-center justify-center">
                    <Image className='portfolio-icon h-12 md:h-16 pr-4 border-r-2 border-gray-300' src={logo1} alt="logo1" />
                    <Image className='portfolio-icon h-12 md:h-16 ml-4' src={logo2} alt="logo2" />
                </div>
                <div className="flex items-center justify-end lg:hidden">
                    <div className="hidden mt-2 mr-4 sm:inline-block">
                        <span />
                    </div>

                    <button
                        onClick={toggleMobileMenu}
                        className={`{ navbar-toggler lg:hidden border-0 ${mobileMenuOpen ? "opened" : ""}`}
                        type="button"
                    >
                        <span>
                            <svg width="34" height="34" viewBox="0 0 100 100">
                                <path
                                    className="line line1"
                                    d="M 20,29.000046 H 80.000231 C 80.000231,29.000046 94.498839,28.817352 94.532987,66.711331 94.543142,77.980673 90.966081,81.670246 85.259173,81.668997 79.552261,81.667751 75.000211,74.999942 75.000211,74.999942 L 25.000021,25.000058"
                                />
                                <path className="line line2" d="M 20,50 H 80" />
                                <path
                                    className="line line3"
                                    d="M 20,70.999954 H 80.000231 C 80.000231,70.999954 94.498839,71.182648 94.532987,33.288669 94.543142,22.019327 90.966081,18.329754 85.259173,18.331003 79.552261,18.332249 75.000211,25.000058 75.000211,25.000058 L 25.000021,74.999942"
                                />
                            </svg>
                        </span>
                    </button>
                </div>

                <div
                    className={` flex-col col-span-2 lg:col-span-2 w-full  px-2 lg:flex lg:w-auto lg:order-1  overflow-hidden ${mobileMenuOpen ? 'block' : 'hidden'}`}
                    id="mobile-menu-2"
                >
                    <ul className="flex  flex-col mt-4   p-3 lg:p-0 text-black font-medium lg:flex-row lg:space-x-8 lg:mt-0 w-full rounded-lg gap-1 lg:gap-0">
                        {navigation.map((item, index) => (
                            <li key={index}>
                                <Link className={`link  no-underline ${activeSection === item.location || pathname === item.location ? 'active' : ''}`}

                                    href={item.location !== '/portfolio' ? `/#${item.location}` : item.location}>
                                    {item.title}
                                </Link>
                            </li>
                        ))}
                        <li>
                            <ButtonPrimary className='items-center mt-3 justify-center font-medium gap-2  px-4 py-2 rounded-md block lg:hidden  w-full'>
                                Download my CV
                            </ButtonPrimary>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    )
}

export default Navbar