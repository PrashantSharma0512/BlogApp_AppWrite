import React from 'react'
import { Link } from 'react-router-dom'
import Logo from '../Logo'

function Footer() {
  return (
    <footer className="relative overflow-hidden pt-20 pb-10 glass-dark border-t border-white/5 mt-auto">
      <div className="relative z-10 mx-auto max-w-7xl px-8">
        <div className="-m-6 flex flex-wrap">
          <div className="w-full p-6 md:w-1/2 lg:w-5/12">
            <div className="flex h-full flex-col justify-between">
              <div className="mb-6">
                <Link to="/" className="inline-flex items-center gap-2 mb-4">
                  <Logo />
                  <span className="text-xl font-bold tracking-tighter text-gradient">
                    BLOG<span className="text-white/50">APP</span>
                  </span>
                </Link>
                <p className="text-sm text-zinc-500 leading-relaxed max-w-xs">
                  A premium platform for creators to share stories and connect with a global community.
                </p>
              </div>
              <div>
                <p className="text-xs text-zinc-600 font-medium">
                  &copy; {new Date().getFullYear()} BLOGAPP. Crafted with ❤️ for Creators.
                </p>
              </div>
            </div>
          </div>
          <div className="w-full p-6 md:w-1/2 lg:w-2/12">
            <div className="h-full">
              <h3 className="tracking-[0.1em] mb-8 text-[10px] font-bold uppercase text-zinc-500">
                EXPLORE
              </h3>
              <ul className="space-y-4">
                <li>
                  <Link className="text-sm text-zinc-400 hover:text-white transition-colors" to="/">Features</Link>
                </li>
                <li>
                  <Link className="text-sm text-zinc-400 hover:text-white transition-colors" to="/">Pricing</Link>
                </li>
                <li>
                  <Link className="text-sm text-zinc-400 hover:text-white transition-colors" to="/">Affiliate</Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="w-full p-6 md:w-1/2 lg:w-2/12">
            <div className="h-full">
              <h3 className="tracking-[0.1em] mb-8 text-[10px] font-bold uppercase text-zinc-500">
                SUPPORT
              </h3>
              <ul className="space-y-4">
                <li>
                  <Link className="text-sm text-zinc-400 hover:text-white transition-colors" to="/">Account</Link>
                </li>
                <li>
                  <Link className="text-sm text-zinc-400 hover:text-white transition-colors" to="/">Help Center</Link>
                </li>
                <li>
                  <Link className="text-sm text-zinc-400 hover:text-white transition-colors" to="/">Contact Us</Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="w-full p-6 md:w-1/2 lg:w-3/12">
            <div className="h-full">
              <h3 className="tracking-[0.1em] mb-8 text-[10px] font-bold uppercase text-zinc-500">
                FOLLOW US
              </h3>
              <div className="flex gap-4">
                <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/5 flex items-center justify-center hover:bg-white/10 cursor-pointer transition-all">
                  <span className="text-zinc-400">𝕏</span>
                </div>
                <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/5 flex items-center justify-center hover:bg-zinc-800 cursor-pointer transition-all">
                  <span className="text-zinc-400">gh</span>
                </div>
                <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/5 flex items-center justify-center hover:bg-pink-500/10 cursor-pointer transition-all">
                  <span className="text-zinc-400">ig</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer