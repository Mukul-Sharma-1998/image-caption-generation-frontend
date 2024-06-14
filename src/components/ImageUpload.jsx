import { React, useState } from 'react'
import { useForm } from 'react-hook-form'
import { platforms, moods } from '../constants'
import upload from '../assets/upload.png'

const ImageUpload = () => {
  const [platform, setPlatform] = useState("Instagram")
  const [mood, setMood] = useState("Funny")
  console.log(platform)
  console.log(mood)

  const url = `${import.meta.env.VITE_REACT_APP_BACKEND_URL}?platform=${platform}&mood=${mood}`;
  
  const {register, handleSubmit, formState: {errors, isSubmitting}, setError} = useForm({
    defaultValues:{
      platform: "Instagram",
      mood: "Funny"
    }
  })
  
  const [captions, setCaptions] = useState([])
  const [hashtags, setHashtags] = useState([])
  console.log(captions)
  console.log(hashtags)

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
        message: "Something went worng, please try again in few minutes!"
      })
    }
  }

  return (
    <div>
      <form encType='multipart/form-data' onSubmit={handleSubmit(onSubmit)} 
      className='flex flex-col items-center justify-start sm:m-10 m-5'
      >

        <div className='m-4'>
          <input 
          className='absolute cursor-pointer w-[64px] h-[64px] opacity-0'
          {...register('image', {
            required: "Image is required"
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

        <div className='m-4'>
          <button type='submit' disabled={isSubmitting} className={`text-black bg-yellow-300 rounded-xl w-20 h-10 ${isSubmitting ? `animate-pulse` : `animate-none`}`}>
            {isSubmitting? "Loading..." : "Submit"}
          </button>
        </div>

        {errors.root && <div className='text-red-500'>{errors.root.message}</div>}
      </form>
      <div className='flex flex-col items-center'>
        {captions.length>0 && <h1 className='text-yellow-300 font-bold'>Customized Captions</h1>}
        {captions.map((caption, index) => (
          <div>
            <h1 className='text-white m-3 text-center mb-0'>- {caption}</h1> <br />
          </div>
        ))}
        {captions.length>0 && <h1 className='text-yellow-300 font-bold'>Customized Hashtags</h1>}
        <div className='flex flex-wrap justify-center w-1/2'>
          {hashtags.map((hashtag, index) => (
            <div>
              <h1 className='text-white'>{hashtag}</h1>
            </div>
          ))}
        </div>
      </div>
    </div>
    
  )
}

export default ImageUpload