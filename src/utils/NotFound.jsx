import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-yellow-300 via-orange-300 to-red-300 relative top-0 w-screen h-screen">
            {/* Tom and Jerry Animation */}
            <div className="relative mb-8 flex justify-center items-center">
                {/* 404 Text */}
                <h1 className="text-9xl font-extrabold text-gray-800 animate-bounce">404</h1>

                
            </div>

            {/* Funny Message */}
            <p className="text-xl text-white text-center mb-6 animate-fade">
                Oops! Tom and Jerry ran off with this page! 🐭🐱
            </p>

            {/* Navigation Button */}
            <Link
                to="/"
                className="px-6 py-3 text-lg font-semibold text-white bg-red-600 rounded-lg shadow-lg hover:bg-red-700 transition-all animate-bounce"
            >
                Catch them back to safety!
            </Link>

            {/* Custom Animations */}
            <style>
                {`
          @keyframes run {
            0% { transform: translateX(0); }
            50% { transform: translateX(30px); }
            100% { transform: translateX(0); }
          }

          @keyframes chase {
            0% { transform: translateX(-20px); }
            50% { transform: translateX(10px); }
            100% { transform: translateX(-20px); }
          }

          @keyframes fade {
            0%, 100% {
              opacity: 0.7;
            }
            50% {
              opacity: 1;
            }
          }

          .animate-run {
            animation: run 1s infinite ease-in-out;
          }

          .animate-chase {
            animation: chase 1s infinite ease-in-out;
          }

          .animate-fade {
            animation: fade 3s infinite ease-in-out;
          }
            .custom-mask {
            -webkit-mask-image: url("https://th.bing.com/th/id/OIP.GZrJyXuYgjzp3Wd9JhxUqgHaE7?rs=1&pid=ImgDetMain");
            mask-image: url("https://th.bing.com/th/id/OIP.GZrJyXuYgjzp3Wd9JhxUqgHaE7?rs=1&pid=ImgDetMain");
            -webkit-mask-repeat: no-repeat;
            mask-repeat: no-repeat;
            -webkit-mask-size: cover;
            mask-size: cover;
            background-color: transparent;
          }
        `}
            </style>
        </div>
    );
};

export default NotFound;
