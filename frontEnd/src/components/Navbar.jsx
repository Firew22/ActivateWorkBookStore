import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FaBarsStaggered, FaBlog, FaXmark } from 'react-icons/fa6';
import { AuthContext } from '../contexts/AuthProvider';

const Navbar = () => {
    const [isMenuOpen, setMenuOpen] = useState(false);
    const [isSticky, setSticky] = useState(false);
    const { user } = useContext(AuthContext); // Destructure user from AuthContext

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
        { link: 'Blog', path: '/blog' },
    ];

    return (
        <header className={`${isSticky ? 'sticky top-0 z-50 bg-white shadow-md' : ''}`}>
            <nav className="flex justify-between items-center p-8">
                <div className="flex justify-between items-center text-base gap-8">
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
                    {user ? (
                        <li>
                            <span className="block text-base text-black uppercase cursor-pointer">
                                {user.email}
                            </span>
                        </li>
                    ) : (
                        <li>
                            <Link to="/login" className="block text-base text-black uppercase cursor-pointer hover:text-blue-700">
                                Login
                            </Link>
                        </li>
                    )}
                </ul>
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
                        {user ? (
                            <li>
                                <span className="block text-base text-black uppercase cursor-pointer">
                                    {user.email}
                                </span>
                            </li>
                        ) : (
                            <li>
                                <Link to="/login" className="block text-base text-black uppercase cursor-pointer hover:text-blue-700" onClick={() => setMenuOpen(false)}>
                                    Login
                                </Link>
                            </li>
                        )}
                    </ul>
                </div>
            )}
        </header>
    );
};

export default Navbar;