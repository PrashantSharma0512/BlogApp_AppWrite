import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { useForm } from 'react-hook-form'
import { Button, Logo, Input } from './index'
import authService from '../appWrite/auth'
import { login } from '../store/authSlice'

const SignUp = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { register, handleSubmit } = useForm()
    const [error, setError] = useState("")
    const [loading, setLoading] = useState(false)
    const createAcc = async (data) => {
        setError("")
        setLoading(true)
        try {
            const userData = await authService.createAccount(data)
            if (userData) {
                const userData = await authService.getCurrentUser()
                if (userData) {
                    dispatch(login(userData))
                    navigate('/')
                }
            }
        } catch (error) {
            setError(error.message)
        } finally {
            setLoading(false)
        }
    }
    return (
        <div className="flex items-center justify-center w-full min-h-[80vh] py-12 px-6">
            <div className="mx-auto w-full max-w-md glass-dark rounded-[2.5rem] p-10 md:p-12 border border-white/5 shadow-2xl relative overflow-hidden group">
                {/* Decorative Elements */}
                <div className="absolute -top-24 -right-24 w-48 h-48 bg-blue-600/10 rounded-full blur-3xl group-hover:bg-blue-600/20 transition-all duration-700"></div>
                <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-indigo-600/10 rounded-full blur-3xl group-hover:bg-indigo-600/20 transition-all duration-700"></div>

                <div className="mb-8 flex flex-col items-center gap-4 relative">
                    <Logo className="scale-125" />
                    <div className="text-center space-y-1">
                        <h2 className="text-3xl font-bold tracking-tight text-white">Create Account</h2>
                        <p className="text-zinc-500 text-sm">Join our community of creators today</p>
                    </div>
                </div>

                {error && (
                    <div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded-2xl text-red-500 text-xs font-medium text-center animate-in fade-in slide-in-from-top-2">
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit(createAcc)} className="space-y-6 relative">
                    <div className="space-y-4">
                        <Input
                            label="Full Name"
                            placeholder="John Doe"
                            autoComplete="name"
                            {...register("name", {
                                required: "Full name is required",
                            })}
                        />
                        <Input
                            label="Email Address"
                            placeholder="name@example.com"
                            type="email"
                            autoComplete="email"
                            {...register("email", {
                                required: "Email is required",
                                validate: {
                                    matchPattern: (value) => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/g.test(value) ||
                                        "Email address must be a valid address",
                                }
                            })}
                        />
                        <Input
                            label="Password"
                            type="password"
                            placeholder="••••••••"
                            autoComplete="new-password"
                            {...register("password", {
                                required: "Password is required",
                            })}
                        />
                    </div>

                    <Button
                        type="submit"
                        variant="secondary"
                        className="w-full py-4 text-base"
                        disabled={loading}
                    >
                        {loading ? 'Creating Account...' : 'Create Account'}
                    </Button>

                    <p className="text-center text-sm text-zinc-500 pt-4">
                        Already have an account?&nbsp;
                        <Link
                            to="/login"
                            className="font-bold text-white hover:text-blue-400 transition-colors"
                        >
                            Sign In
                        </Link>
                    </p>
                </form>
            </div>
        </div>
    )
}

export default SignUp