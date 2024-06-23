import { React, useEffect, useRef, useState } from 'react'
import { useForm } from 'react-hook-form'
import { platforms, moods, rightPannelContent } from '../constants'
import upload from '../assets/upload.png'
import { TypeAnimation } from 'react-type-animation';

const ImageUpload = () => {
  const [platform, setPlatform] = useState("Instagram")
  const [mood, setMood] = useState("Funny")
  const [imageUrl, setImageUrl] = useState(null)
  const captionRef = useRef(null)

  const url = `${import.meta.env.VITE_REACT_APP_BACKEND_URL}?platform=${platform}&mood=${mood}`;
  
  const {register, handleSubmit, formState: {errors, isSubmitting}, setError} = useForm({
    defaultValues:{
      platform: "Instagram",
      mood: "Funny"
    }
  })
  
  const [captions, setCaptions] = useState([])
  const [hashtags, setHashtags] = useState([])

  useEffect(() => {
    if(captions.length > 0) {
      captionRef.current.scrollIntoView({ behavior: 'smooth'});
    }
  }, [captions])

  const onSubmit = async (data) => {
    try {
      const formData = new FormData()
      formData.append('image', data.image[0])
      const queryParams = new URLSearchParams({
        platform: data.platform,
        mood: data.mood,
      });
      const result = await fetch(url, {
        method: 'POST',
        body: formData
      })
      const jsonResult = await result.json()
      // setCaptions(prev => [...prev, jsonResult.captions])
      setCaptions(jsonResult.captions)
      setHashtags(jsonResult.hashtags)
      if(!result.ok) {
        throw new Error()
      }
    }
    catch (error) {
      setError("root", {
        message: "Please try with an image below 10MB"
      })
    }
  }

  const handleImageUpload = (e) => {
    setImageUrl(null)
    setCaptions([])
    setHashtags([])
    const file = e.target.files[0]
    if(file) {
      const newImageUrl = URL.createObjectURL(file)
      setImageUrl(newImageUrl)
    }
  }

  return (
    <div>
      <div className='sm:flex justify-evenly'>
        <div className='sm:flex items-center sm:w-1/3 hidden'>
          {/* <h1 className='text-yellow-300 text-center font-bold p-4 text-[40px] opacity-50'>Up your <br/> social media <br/> game!</h1> */}
          <TypeAnimation className='text-yellow-300 text-center font-bold p-4 text-[40px] opacity-50'
            sequence={rightPannelContent}
            wrapper="span"
            speed={10}
            style={{ display: 'inline-block' }}
            repeat={Infinity}
          />
        </div>
        <form encType='multipart/form-data' onSubmit={handleSubmit(onSubmit)} 
        className='flex flex-col items-center justify-start sm:m-10 m-5'
        >

          <div className='m-0'>
            <input 
            className='absolute cursor-pointer w-[64px] h-[64px] opacity-0'
            {...register('image', {
              required: "An image of less than 10MB is required!",
              validate: {
                sizeLimit: value => {
                  if (value[0]?.size > 10 * 1024 * 1024) { // 10MB limit
                    return 'File size exceeds the limit of 10MB';
                  }
                  return true;
                }
              },
              onChange: handleImageUpload
            })} type="file" accept='image/*' />
            <img 
            src={upload} 
            alt="Upload Image"
            className='w-full object-cover cursor-pointer animate-bounce'
            onClick={() => document.querySelector('input[type="file"]').click()}
            />
          </div>
          {errors.image && <div className='text-red-500'>{errors.image.message}</div>}

        
          <div className='m-4'>
            <select {...register('platform', {
              required: "Platform id required"
            })}
            onChange={(e) => {
              setPlatform(e.target.value)
            }}
            className='bg-black text-yellow-300 rounded-sm border border-yellow-300 border-solid'
            >
              {platforms.map((eachPlatform, index) => (
                <option value={eachPlatform} key={index}
                className='w-32 h-8'
                >
                  {eachPlatform}
                </option>
              ))}
            </select>
          </div>
          {errors.platform && <div className='text-red-500'>{errors.platform.message}</div>}

        
          <div className='m-4'>
            <select {...register('mood', {
              required: "Mood id required"
            })}
            onChange={(e) => {
              setMood(e.target.value)
            }}
            className='bg-black text-yellow-300 rounded-sm border border-yellow-300 border-solid'
            >
              {moods.map((eachMood, index) => (
                <option value={eachMood} key={index}>{eachMood}</option>
              ))}
            </select>
          </div>
          {errors.mood && <div className='text-red-500'>{errors.mood.message}</div>}

          <div className='m-4 p-0'>
            <button type='submit' disabled={isSubmitting} className={`text-black font-bold bg-yellow-300 rounded-xl p-3 ${isSubmitting && `animate-pulse`}`}>
              {isSubmitting? "Generating..." : captions.length>0? "Generate Again" : "Generate"}
            </button>
          </div>

          {errors.root && <div className='text-red-500'>{errors.root.message}</div>}
        </form>
        <div className='sm:flex items-center sm:w-1/3 hidden'>
          <h1 className='text-yellow-300 text-center font-bold p-4 text-[40px] opacity-50 shadow-black shadow-lg'>Take it <br/> to the next level <br/> with the help of <br/> AI</h1>
        </div>
      </div>

      
      <div className='flex flex-col items-center' ref={captionRef}>
        {imageUrl && <img src={imageUrl} alt='Uploaded Image' className='w-64 h-84 m-5 rounded-lg'/>}
        {captions.length>0 && <h1 className='text-yellow-300 font-bold mt-8 mb-2 text-lg'>Customized Captions</h1>}
        {captions.map((caption, index) => (
          <div>
            <h1 className='text-yellow-300 m-3 text-center my-0 mx-9 font-sans'>- {caption}</h1> <br />
          </div>
        ))}
        {captions.length>0 && <h1 className='text-yellow-300 font-bold text-lg'>Customized Hashtags</h1>}
        <div className='flex flex-wrap justify-center w-1/2'>
          {hashtags.map((hashtag, index) => (
            <div>
              <h1 className='text-yellow-300 text-center font-sans'>{hashtag}</h1>
            </div>
          ))}
        </div>
      </div>
    </div>
    
  )
}

export default ImageUpload