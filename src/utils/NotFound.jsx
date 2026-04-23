import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen mesh-gradient text-white p-6">
            <div className="glass-dark p-12 md:p-20 rounded-[3rem] border border-white/5 shadow-2xl text-center space-y-8 animate-in fade-in zoom-in duration-700">
                <div className="relative">
                    <h1 className="text-[10rem] md:text-[15rem] font-bold tracking-tighter text-gradient leading-none opacity-20">404</h1>
                    <div className="absolute inset-0 flex items-center justify-center">
                        <span className="text-6xl md:text-8xl animate-bounce">🎬</span>
                    </div>
                </div>

                <div className="space-y-4">
                    <h2 className="text-3xl md:text-5xl font-bold tracking-tight">Page not found</h2>
                    <p className="text-zinc-500 text-lg max-w-md mx-auto leading-relaxed">
                        The story you're looking for has been moved or doesn't exist. Let's get you back to the main stage.
                    </p>
                </div>

                <div className="pt-8">
                    <Link to="/">
                        <button className="px-10 py-4 bg-white text-black rounded-2xl font-bold hover:bg-zinc-200 transition-all transform hover:scale-105 shadow-xl shadow-white/5">
                            Back to Home
                        </button>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default NotFound;
