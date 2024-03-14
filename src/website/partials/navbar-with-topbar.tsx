'use client'

import React, { useState, useEffect } from 'react'

import { MassiveLogoColor } from '@/assets/branding';
import { constants, styles } from '@/styles/styles'

import { Topbar } from './topbar';
import useIsMobile from '../hooks/useIsMobile';

// contact
import { DEFAULT_LOGIN_REDIRECT, DEFAULT_MULTISTEP_FORM_ROUTE } from '../../../routes';
import { InternalAnchor } from '@/components/ui/link';


const MAIN_NAVIGATION = [
    { label: 'Website', href: '/zakelijke-website-laten-maken' },
    { label: 'Webshop', href: '/professionele-webshop-laten-maken' },
    { label: 'SEO', href: '/search-engine-optimization' },
    { label: 'Blog', href: '/blog' },
];


interface DrawerProps {
    isOpen: boolean;
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export const NavbarWithTopbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [lastScrollY, setLastScrollY] = useState(0);
    // set to height of topbar
    const [navbarStyle, setNavbarStyle] = useState('');

    const isMobile = useIsMobile();

    const controlNavbar = () => {
        if (typeof window !== 'undefined') {
            if (window.scrollY > lastScrollY && window.scrollY > 100) {
                // Scrolling down
                setNavbarStyle('-translate-y-full');
            } else {
                // Scrolling up
                if (window.scrollY <= 150) {
                    // At the top of the page
                    // Set to height of topbar
                    // setNavbarStyle('translate-y-11');
                } else {
                    setNavbarStyle('translate-y-0');
                }
            }
            // Update the last scroll position
            setLastScrollY(window.scrollY);
        }
    };



    useEffect(() => {
        if (typeof window !== 'undefined') {
            window.addEventListener('scroll', controlNavbar);

            return () => {
                window.removeEventListener('scroll', controlNavbar);
            };
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [lastScrollY]);


    return (
        <header>
            <nav>
                {isMobile ? (
                    // Mobile navigation
                    <div>
                        <button aria-label="Open menu" onClick={() => setIsOpen(!isOpen)} className={`md:hidden fixed right-8 top-8 p-[14px] ${constants.glassFill} shadow-custom-lg rounded-full z-50`}>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="h-5 w-5 text-gray-600">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
                            </svg>
                        </button>
                        <Drawer isOpen={isOpen} setIsOpen={setIsOpen} />
                    </div>
                ) : (
                    // Desktop navigation 
                    <div className={`hidden md:block fixed top-0 w-full z-30 transition-transform duration-500 ease-in-out ${navbarStyle}`}>
                        <div className={`px-6 py-6 mt-4 rounded-2xl  max-w-[1324px] mx-auto ${styles.glass}`}>
                            <div className='flex flex-row '>
                                <InternalAnchor href='/'>
                                    <MassiveLogoColor className="w-14" />
                                </InternalAnchor>

                                <ul className="hidden mr-auto pl-12 md:flex items-center gap-[54px]  text-base leading-6 font-medium text-gray-600 ">
                                    {MAIN_NAVIGATION.map((item) => (
                                        <li key={item.label}>
                                            <InternalAnchor href={item.href} className='hover:text-primary-500'>{item.label}</InternalAnchor>
                                        </li>
                                    ))}
                                </ul>

                                <ul className='flex gap-4'>
                                    <li>
                                        <InternalAnchor href={DEFAULT_LOGIN_REDIRECT} size='sm' variant='glass' className='md:block hidden'>Login</InternalAnchor>
                                    </li>
                                    <li>
                                        <InternalAnchor href={DEFAULT_MULTISTEP_FORM_ROUTE} size='sm' variant='primary' className='md:block hidden'>Contact</InternalAnchor>
                                    </li>
                                </ul>
                            </div>
                        </div>

                        <div className="absolute w-full left-1/2 -translate-x-1/2 h-11 bg-white -top-11">
                            <Topbar />
                        </div>
                    </div>
                )}
            </nav>
        </header>
    )
}

const Drawer = ({ isOpen, setIsOpen }: DrawerProps) => {
    return (
        <div className={`fixed top-0 left-0 bottom-0 w-full h-screen bg-white z-50 transform transition-transform duration-200 ease-in-out ${isOpen ? '-translate-x-0' : 'translate-x-full'} md:hidden`}>
            <button aria-label="Close menu" onClick={() => setIsOpen(false)} className={`fixed right-8 top-8 p-[14px] ${constants.glassFill} shadow-custom-lg rounded-full z-50`}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="h-6 w-6 text-gray-600">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
            </button>
            <ul className="p-4 mt-6  flex flex-col h-full gap-6   text-base leading-6 font-medium text-gray-600">
                <li>
                    <InternalAnchor href='/'><MassiveLogoColor className="w-14" /></InternalAnchor>
                </li>
                {MAIN_NAVIGATION.map((item) => (
                    <li key={item.label}>
                        <InternalAnchor href={item.href} onClick={() => setIsOpen(!isOpen)} className='hover:text-primary-500'>{item.label}</InternalAnchor>
                    </li>
                ))}
                <li><InternalAnchor href={DEFAULT_LOGIN_REDIRECT} size="sm" variant="glass" className='w-full' >Log in</InternalAnchor> </li>
                <li>
                    <InternalAnchor href={DEFAULT_MULTISTEP_FORM_ROUTE} size='sm' variant='primary' className='w-full'>Contact</InternalAnchor>
                </li>
            </ul>
        </div>
    );
};
