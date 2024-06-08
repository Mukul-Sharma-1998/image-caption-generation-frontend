import React from 'react'
import { Navbar, Button, Captions, Footer,  ImageUpload } from './components'

const App = () => {
  return (

    <div className='flex flex-col min-h-screen bg-black w-full overflow-hidden'>
      <div className='flex-grow'>
        <div className='sm:px-16 px-6 flex justify-center items-center'>
          <div className='xl:max-w-[1280px] w-full'>
            <Navbar />
          </div>
        </div>

        <div className='bg-black flex justify-center items-start'>
          <div className='xl:max-w-[1280px] w-full'>
            <ImageUpload />
          </div>
        </div>
      </div>

      <div className='bg-black justify-center sm:px-16 px-6 pb-4'>
        <div className='xl:max-w-screen w-full'>
          <Footer />
        </div>
      </div>
      
    </div>
  )
}

export default App