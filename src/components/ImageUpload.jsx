import { React, useState } from 'react'
import { useForm } from 'react-hook-form'
import { platforms, moods } from '../constants'

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
      <form encType='multipart/form-data' onSubmit={handleSubmit(onSubmit)}>

        <input {...register('image', {
          required: "Image is required"
        })} type="file" accept='image/*' />
        {errors.image && <div className='text-red-500'>{errors.image.message}</div>}

        {/* <input {...register('platform', {
          required: "Platform is required"
        })} type="text" placeholder='Instagram'/> */}
        <div>
          <select {...register('platform', {
            required: "Platform id required"
          })}
          onChange={(e) => {
            setPlatform(e.target.value)
          }}
          >
            {platforms.map((eachPlatform, index) => (
              <option value={eachPlatform} key={index}>{eachPlatform}</option>
            ))}
          </select>
        </div>
        {errors.platform && <div className='text-red-500'>{errors.platform.message}</div>}

        {/* <input {...register('mood', {
          required: "Mood is required"
        })} type="text" placeholder='Funny'/> */}
        <div>
          <select {...register('mood', {
            required: "Mood id required"
          })}
          onChange={(e) => {
            setMood(e.target.value)
          }}
          >
            {moods.map((eachMood, index) => (
              <option value={eachMood} key={index}>{eachMood}</option>
            ))}
          </select>
        </div>
        {errors.mood && <div className='text-red-500'>{errors.mood.message}</div>}

        <button type='submit' disabled={isSubmitting} className='text-white'>
          {isSubmitting? "Loading..." : "Submit"}
        </button>

        {errors.root && <div className='text-red-500'>{errors.root.message}</div>}
      </form>
      <div>
        {captions.map((caption, index) => (
          <div>
            <h1 className='text-white'>{caption}</h1> <br />
          </div>
        ))}
        {hashtags.map((hashtag, index) => (
          <div>
            <h1 className='text-white'>{hashtag}</h1>
          </div>
        ))}
      </div>
    </div>
    
  )
}

export default ImageUpload