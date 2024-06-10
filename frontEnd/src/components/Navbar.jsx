import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FaBarsStaggered, FaBlog, FaXmark } from 'react-icons/fa6';

const Navbar = () => {
    const [isMenuOpen, setMenuOpen] = useState(false);
    const [isSticky, setSticky] = useState(false);

    // Toggle menu
    const toggleMenu = () => {
        setMenuOpen(!isMenuOpen);
    };

    useEffect(() => {
        const handleScroll = () => {
            setSticky(window.scrollY > 100);
        };
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    // Nav items
    const navItems = [
        { link: 'Home', path: '/' },
        { link: 'About', path: '/about' },
        { link: 'Shop', path: '/shop' },
        { link: 'Sell Your Book', path: '/admin/dashboard' },
        { link: 'Login', path: '/login' },
        { link: 'Blog', path: '/blog' },
    ];

    return (
        <header className={`${isSticky ? 'sticky top-0 z-50 bg-white shadow-md' : ''}`}>
            <nav className="flex justify-between items-center p-4">
                <div className="flex items-center gap-2">
                    {/* Logo */}
                    <Link to="/" className="text-2xl font-bold text-blue-700 flex items-center gap-2">
                        <FaBlog className="inline-block" />
                        Books
                    </Link>
                </div>
                {/* Nav items for large devices */}
                <ul className="hidden md:flex space-x-12">
                    {navItems.map((item, index) => (
                        <li key={index}>
                            <Link to={item.path} className="block text-base text-black uppercase cursor-pointer hover:text-blue-700">
                                {item.link}
                            </Link>
                        </li>
                    ))}
                </ul>
                {/* Button for large devices */}
                <div className="hidden lg:flex items-center space-x-12">
                    <button><FaBarsStaggered className="w-5 hover:text-blue-700" /></button>
                </div>
                {/* Menu button for mobile devices */}
                <div className="md:hidden">
                    <button onClick={toggleMenu} className="text-black focus:outline-none">
                        {isMenuOpen ? <FaXmark className="h-5 w-5 text-black" /> : <FaBarsStaggered className="h-5 w-5 text-black" />}
                    </button>
                </div>
            </nav>
            {/* Nav items for small devices */}
            {isMenuOpen && (
                <div className="md:hidden">
                    <ul className="flex flex-col space-y-4 p-4">
                        {navItems.map((item, index) => (
                            <li key={index}>
                                <Link to={item.path} className="block text-base text-black uppercase cursor-pointer hover:text-blue-700" onClick={() => setMenuOpen(false)}>
                                    {item.link}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </header>
    );
};

export default Navbar;