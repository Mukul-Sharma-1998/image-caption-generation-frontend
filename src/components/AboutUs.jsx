import React from 'react'
import aboutUsImage from '../assets/aboutUsImage.jpeg'
import { TypeAnimation } from 'react-type-animation';
import { aboutUsContent, aboutUsStaticContent } from '../constants';

const AboutUs = () => {
  return (
    <div className='flex sm:flex-row flex-col justify-center items-start m-12'>
      <div>
        <img src={aboutUsImage} alt="About Us" className='rounded-xl sm:block hidden mt-14' />
      </div>
      <div>
        {aboutUsStaticContent.map((content, index) => (
            <p className='text-yellow-300 sm:m-12 mb-4 text-center text-lg font-mono'>{content}</p>
        ))}
        <TypeAnimation
          className='text-yellow-300 sm:m-12 mb-4 text-center text-lg font-mono'
          sequence={aboutUsContent}
          wrapper="span"
          speed={30}
          style={{ display: 'inline-block' }}
          repeat={3}
          omitDeletionAnimation={true}
          preRenderFirstString={true}
        />
      </div>
      <div>
        <img src={aboutUsImage} alt="About Us" className='rounded-lg sm:hidden block w-[100px] h-[150px]' />
      </div>
    </div>
  );
};

export default AboutUs;
