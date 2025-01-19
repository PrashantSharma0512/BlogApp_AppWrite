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
  function isOlderThanOneWeek(postDate) {
    const oneWeekInMilliseconds = 7 * 24 * 60 * 60 * 1000; // One week in milliseconds
    const postDateObj = new Date(postDate); // Convert the post date to a Date object
    const currentDate = new Date(); // Current date
    const timeDifference = currentDate - postDateObj; // Difference in milliseconds

    return timeDifference > oneWeekInMilliseconds; // True if the post is older than one week
  }

  return (
    <Link to={`/post/${$id}`}>

      <div className="max-w-md mx-auto bg-gradient-to-br from-gray-800 via-gray-900 to-black rounded-3xl shadow-xl overflow-hidden hover:shadow-2xl transition-shadow duration-300 text-white transform hover:-translate-y-2">

        <div className="relative w-full h-48 overflow-hidden">
          <img
            className="h-full w-full object-cover rounded-t-3xl transition-transform duration-300 hover:scale-110"
            src={appwriteService.getPreview(featuredImage)}
            alt="Post"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-70"></div>
          <span className="absolute bottom-3 left-3 bg-blue-600 text-xs font-semibold uppercase px-3 py-1 rounded-full shadow-md">
            {isOlderThanOneWeek(date) ? "Featured" : "New Post"}
          </span>
        </div>
        <div className="p-6">

          <h2 className="text-2xl font-bold text-gray-100 leading-tight uppercase tracking-wide hover:text-red-500 transition-colors duration-200">
            {title}
          </h2>

          <p className="mt-4 text-gray-300 text-sm line-clamp-3 capitalize leading-relaxed">
            {content?.replace(/<\/?[^>]+>/g, "").replace(/^(&nbsp;|\s)+|(&nbsp;|\s)+$/g, "").trim() || "No content available"}
          </p>


          <p className="text-sm text-red-400 mt-4 font-medium">Posted on:{date}</p>


          <div className="mt-6 flex justify-between items-center">
            <button className="px-6 py-3 text-sm font-semibold text-black bg-gradient-to-r from-red-500 to-yellow-500 rounded-full shadow-lg hover:shadow-xl hover:from-red-600 hover:to-yellow-600 transition-transform transform hover:scale-105">
              Read More
            </button>
            <div className="flex items-center text-gray-400 text-xs space-x-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-4 h-4"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 7.5v9m4.5-4.5h-9"
                />
              </svg>
              <span>Share</span>
            </div>
          </div>
        </div>
      </div>



    </Link>
  )
}

export default PostCard