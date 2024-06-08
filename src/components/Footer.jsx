import React from 'react'
import logo from '../assets/logo.png';
import { footerLinks } from '../constants';

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
                <li key='heading' className='underline font-bold text-yellow-300'>Footer Heading</li>
                {footerLinks.map((foot, index) => (
                    <li key={foot.id}>
                        <a href={foot.id}>
                            {foot.title}
                        </a>
                    </li>
                ))}
            </ul>
        </div>
    </div>
  )
}

export default Footer