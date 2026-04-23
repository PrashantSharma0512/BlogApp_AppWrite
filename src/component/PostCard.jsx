import React, { useState } from 'react'
import appwriteService from '../appWrite/configDB'
import { Link } from 'react-router-dom'
import { PiShareFatFill } from "react-icons/pi";
import { Tooltip } from '@chakra-ui/react';

const PostCard = ({ $id, title, featuredImage, $createdAt, content }) => {
  const [imageLoaded, setImageLoaded] = useState(false);

  const formatDate = (isoDate) => {
    const date = new Date(isoDate);
    return date.toLocaleDateString('en-GB');
  };

  let date = formatDate($createdAt);

  function isOlderThanOneWeek() {
    const oneWeekInMilliseconds = 7 * 24 * 60 * 60 * 1000;
    const postDateObj = new Date($createdAt);
    const currentDate = new Date();
    const timeDifference = currentDate - postDateObj;
    return timeDifference > oneWeekInMilliseconds;
  }

  return (
    <Link to={`/post/${$id}`}>
      <div className="group relative glass-dark rounded-3xl overflow-hidden hover:bg-white/[0.07] transition-all duration-500 border border-white/5 hover:border-white/10 shadow-2xl">
        
        {/* Image Container */}
        <div className="relative aspect-video overflow-hidden">
          {!imageLoaded && (
            <div className="absolute inset-0 bg-white/5 animate-pulse"></div>
          )}
          <img
            className={`h-full w-full object-cover transition-transform duration-700 group-hover:scale-110 ${imageLoaded ? 'opacity-100' : 'opacity-0'}`}
            src={appwriteService.getPreview(featuredImage)}
            alt={title}
            loading="lazy"
            onLoad={() => setImageLoaded(true)}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/20 to-transparent opacity-60"></div>
          
          <div className="absolute top-4 left-4 flex gap-2">
            <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider backdrop-blur-md ${isOlderThanOneWeek() ? 'bg-zinc-500/20 text-zinc-300' : 'bg-blue-500/20 text-blue-400 border border-blue-500/20'}`}>
              {isOlderThanOneWeek() ? "Featured" : "New Post"}
            </span>
          </div>
        </div>

        {/* Post Content */}
        <div className="p-6">
          <div className="flex justify-between items-start mb-3">
             <h2 className="text-xl font-bold text-white leading-tight group-hover:text-blue-400 transition-colors duration-300 line-clamp-2">
              {title}
            </h2>
          </div>

          <div className="text-zinc-500 text-sm line-clamp-2 mb-6 min-h-[40px]">
            <Tooltip 
              hasArrow 
              label={content?.replace(/<\/?[^>]+>/g, "").replace(/&nbsp;/g, " ").trim() || "No content available"}
              bg="zinc.800"
              color="white"
              borderRadius="xl"
              px={4}
              py={2}
            >
              <span>
                {content?.replace(/<\/?[^>]+>/g, "").replace(/&nbsp;/g, "").trim() || "No content available"}
              </span>
            </Tooltip>
          </div>

          <div className="flex items-center justify-between pt-4 border-t border-white/5">
            <div className="flex flex-col">
              <span className="text-[10px] uppercase tracking-widest text-zinc-600 font-bold">Published</span>
              <span className="text-xs text-zinc-400 font-medium">{date}</span>
            </div>
            
            <div className="flex items-center gap-3">
              <button className="p-2 rounded-full hover:bg-white/5 text-zinc-500 hover:text-white transition-all">
                <PiShareFatFill size={18} />
              </button>
              <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center text-[10px] font-bold text-white shadow-lg shadow-blue-600/20">
                {title.charAt(0)}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Link>
  )
}

export default PostCard;
