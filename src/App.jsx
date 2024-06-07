import React from 'react'
import { Navbar, Button, Captions, Footer,  ImageUpload } from './components'

const App = () => {
  return (
    <div className='bg-black w-full overflow-hidden'>

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

      <div className='bg-black flex justify-center items-start sm:px-16 px-6'>
        <div className='xl:max-w-[1280px] w-full'>
          <Footer />
        </div>
      </div>
    </div>
  )
}

export default App