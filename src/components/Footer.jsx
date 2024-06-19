import React from 'react'
import logo from '../assets/logo.png';
import { footerLinks } from '../constants';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <div className='text-white flex sm:flex-row flex-col justify-around items-center'>

        <div>
            <img 
            className='w-[74px] h-[62px]'
            src={logo} alt="CaptionIt" />
        </div>
        
        <div>
            <ul className='m-4 flex flex-col justify-center items-center pr-0'>
                <li key='heading' className='font-bold text-yellow-300'>Footer Heading</li>
                {footerLinks.map((foot, index) => (
                    <li key={foot.id}>
                        <Link to={foot.id}>
                            {foot.title}
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    </div>
  )
}

export default Footer