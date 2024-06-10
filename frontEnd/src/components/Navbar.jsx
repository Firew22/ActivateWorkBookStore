import React,{useEffect, useState} from 'react'
import { Link } from 'react-router-dom'
import {FaBlog} from 'react-icons/fa6'


const Navbar = () => {
    const [isMenuOpen, setMenuOpen] = useState(false)
    const [isSticky, setSticky] = useState(false)

//toggle menu
const toggleMenu =() =>{
    setMenuOpen(!isMenuOpen)
}
useEffect(() =>{
    const handleScroll = ()=>{
        if(window.scrollY > 100){
            setSticky(true)
        }else{
            setSticky(false)
        }
    }
    window.addEventListener('scroll', handleScroll)
    return ()=>{
        window.removeEventListener('scroll', handleScroll)
    }
},[])
//navItems here
const navItems =[
    {link:'Home',path:'/'},
    {link:'About',path:'/about'},
    {link:'Shop',path:'/shop'},
    {link:'Sell Your Book',path:'/admin/dashboard'},
    {link:'',path:'/login'},
    {link:'Blog',path:'/blog'}
]

  return (
    <header>
        <nav>
            <div>
                {/* logo */}
                <Link to='/' className='text-2xl font-bold text-blue-700 flex item-center gap-2'>
                <FaBlog className='inline-block'/>
                Books
                </Link>
                {/* nav item for large device*/}
                <ul className=''>
                    {navItems.map((item,index)=>(
                        <li key={index}>
                            <Link to={item.path} className='block text-base text-black
                            uppercase cursor-pointer hover:text-blue-700'>{item.link}</Link>
                        </li>
                    ))}
                </ul>
            </div>
        </nav>
    </header>
  )
}

export default Navbar