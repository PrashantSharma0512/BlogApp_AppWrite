import React, { useState } from 'react'
import appwriteService from '../appWrite/configDB'
import { Link } from 'react-router-dom'
const PostCard = ({ $id, title, featuredImage, description = 'I am Descripition', $createdAt, content }) => {
  // const [date , setDate] = useState()
  const formatDate = (isoDate) => {
    const date = new Date(isoDate);
    return date.toLocaleDateString('en-GB'); // 'en-GB' formats as dd/mm/yyyy
  };
  let date = formatDate($createdAt);
  return (
    <Link to={`/post/${$id}`}>
      {/* card 1 */}
      {/* <div className='w-full bg-zinc-900 rounded-xl p-4 flex justify-center items-center flex-col'>
        <div className='w-full flex justify-center items-center py-2 '>
            <img src={appwriteService.getPreview(featuredImage)} alt={title} className='rounded-xl'/>
        </div>
        <h2
        className='text-xl font-bold text-white'
        >{title}</h2>
      </div> */}
      {/* card 2 */}
      {/* <div className="max-w-md mx-auto bg-zinc-950 rounded-xl shadow-md overflow-hidden md:max-w-2xl text-white">
        <div className="md:flex">
          <div className="md:w-1/3 p-1">
            <img
              className="h-full w-full object-cover rounded-l-xl"
              src={appwriteService.getPreview(featuredImage)}
              alt="Post"
            />
          </div>
          <div className="p-4 md:w-2/3">
            <h2 className="text-lg font-bold text-gray-300">{title}</h2>
            <p className="text-sm text-gray-400 mt-1">{date}</p>
            <p className="mt-2 text-gray-700 truncate" style={{ maxWidth: "200px" }}>
              {content.replace(/<\/?[^>]+(>|$)/g, "")}
            </p>
          </div>
        </div>
      </div> */}
      {/* card 3 */}
      {/* <div className="max-w-md mx-auto bg-gradient-to-r from-gray-800 via-zinc-950 to-gray-800 rounded-xl shadow-lg overflow-hidden md:max-w-2xl text-white transition-transform transform hover:scale-105">
        <div className="md:flex">
          <div className="p-6 md:w-2/3">
            <h2 className="text-xl font-extrabold text-gray-100 leading-tight">{title}</h2>
            <p className="text-sm text-gray-400 mt-1">{date}</p>
            <p className="mt-3 text-gray-300 truncate" style={{ maxWidth: "220px" }}>
              {content.replace(/<\/?[^>]+(>|$)/g, "")}
            </p>
            <button className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-800">
              Read More
            </button>
          </div>
          <div className="md:w-1/3">
            <img
              className="h-full w-full object-cover rounded-r-xl shadow-md"
              src={appwriteService.getPreview(featuredImage)}
              alt="Post"
            />
          </div>
        </div>
      </div> */}
      <div className="max-w-md mx-auto bg-zinc-950 rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-shadow duration-300 text-white">
        <img
          className="h-48 w-full object-cover"
          src={appwriteService.getPreview(featuredImage)}
          alt="Post"
        />
        <div className="p-6">
          <h2 className="text-2xl font-bold text-gray-100 leading-tight uppercase">
            {title}
          </h2>
          <p className="text-sm text-gray-400 mt-2">{date}</p>
          <p className="mt-4 text-gray-300 line-clamp-3">
            {content.replace(/<\/?[^>]+(>|$)/g, "")}
          </p>
        </div>
      </div>


    </Link>
  )
}

export default PostCard