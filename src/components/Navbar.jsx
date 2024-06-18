import {React, useState} from 'react'
import { navLinks } from '../constants'
import logo from '../assets/logo.png';
import menu from '../assets/menu.jpg'
import close from '../assets/close.jpg'
import { NavLink, Link } from 'react-router-dom';

const Navbar = () => {
    const [toggle, settoggle] = useState(false)
    console.log(toggle)
  return (
    <nav className='text-white w-full flex py-6 justify-between items-center'>
        <Link to="/">
        <img src={logo} alt="CaptionIt" 
            className='w-[64px] h-[52px]'
        />
        </Link>

        {/* for big devices */}
        <ul className='list-none sm:flex hidden justify-end items-center flex-1'>
            {navLinks.map((nav, index) => (
                <li key={nav.id} className={`coursor-pointer text-[16px] ${index === navLinks.length-1 ? 'mr-0' : 'mr-10'} font-bold`}>
                    <Link to={nav.id}>
                        {nav.title}
                    </Link>
                </li>
            ))}

        </ul>

        {/* for small devices */}
        <div className='sm:hidden flex flex-1 justify-end items-center'>
            <img src={toggle ? close : menu} alt="menu"
            className='w-[28px] h-[28px]'
            onClick={() => settoggle((prev) => !prev)}
            />
            <div className={`${toggle ? 'flex' : 'hidden'} p-6 bg-black-gradient absolute top-20 right-0 mx-4 my-2 min-w-[140px] rounded-xl sidebar`}>
                <ul className='list-none flex flex-col items-center justify-center flex-1'>
                    {navLinks.map((nav, index) => (
                        <li key={nav.id} className={`coursor-pointer text-[16px] ${index === navLinks.length-1 ? 'mb-0' : 'mb-4'}`}>
                            <Link to={nav.id}>
                                {nav.title}
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    </nav>
  )
}

export default Navbar