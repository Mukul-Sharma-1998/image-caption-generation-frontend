import React from 'react'
import aboutUsImage from '../assets/aboutUsImage.jpeg'


const AboutUs = () => {
  return (
    <div className='flex sm:flex-row flex-col justify-center items-start m-12'>
        <div>
            <img src={aboutUsImage} alt="About Us" className='rounded-xl sm:block hidden mt-14' />
        </div>
        <div>
            <p className='text-yellow-300 sm:m-12 mb-4 text-center text-lg'>
                Using AI to improve your social media game is crucial in today's digital landscape, where competition for attention is fierce 
                and the pace of content creation is relentless. AI offers unparalleled capabilities in analyzing vast amounts of data to 
                understand trends, audience preferences, and engagement patterns. With AI, you can generate personalized captions that resonate 
                with your target audience, ensuring your posts are not only seen but also remembered. AI-driven tools can suggest the most effective 
                hashtags, boosting your content's visibility and reach. Moreover, AI can automate tedious tasks, allowing you to focus on creating 
                high-quality content and engaging with your audience. By leveraging AI, you can gain insights into the best times to post, optimal 
                content formats, and even predict the success of your campaigns. This level of precision and efficiency is impossible to achieve manually. 
                In essence, AI empowers you to make data-driven decisions, enhance your content strategy, 
                and ultimately, stand out in a crowded social media landscape.</p>
            <p className='text-yellow-300 sm:m-12 mb-4 text-center text-lg sm:block hidden'>
                Integrating AI into your social media strategy is becoming increasingly essential for staying competitive. 
                AI's advanced analytics can uncover deep insights from your data, revealing patterns and trends that might go unnoticed by the human eye. 
                This allows you to tailor your content to meet the specific interests and behaviors of your audience, leading to higher engagement rates. 
                AI tools can also provide real-time feedback on your posts, helping you quickly adjust and optimize your strategy. 
                From personalized content suggestions to sentiment analysis, AI can transform the way you connect with your followers, 
                making your social media efforts more impactful and effective.
            </p>
        </div>
        <div>
            <img src={aboutUsImage} alt="About Us" className='rounded-lg sm:hidden block w-[100px] h-[150px]' />
        </div>
    </div>
  )
}

export default AboutUs