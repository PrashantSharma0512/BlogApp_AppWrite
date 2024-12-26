import React from 'react'
import appwriteService from '../appWrite/configDB'
import { Link } from 'react-router-dom'
const PostCard = ({ $id, title, featuredImage }) => {
  console.log("id",$id);
  console.log("featured image", featuredImage)
  console.log("title", title)
  
  return (
    <Link to={`/post/${$id}`}>
      <div className='w-full bg-gray-100 rounded-xl p-4'>
        <div className='w-full justify-center mb-4'>
            <img src={appwriteService.getPreview(featuredImage)} alt={title} className='rounded-xl'/>
        </div>
        <h2
        className='text-xl font-bold'
        >{title}</h2>
      </div>
    </Link>
  )
}

export default PostCard