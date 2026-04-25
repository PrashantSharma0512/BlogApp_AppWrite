import React, { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { login as authLogin } from "../store/authSlice"
import { Logo, Input, Button } from './index'
import { useDispatch } from "react-redux"
import authService from '../appWrite/auth'
import { useForm } from 'react-hook-form'

const Login = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate()
    const { register, handleSubmit } = useForm()
    const [error, setError] = useState("")
    const [loading, setLoading] = useState(false)
    
    const login = async (data) => {
        setError("")
        setLoading(true)
        try {
            const session = await authService.login(data)
            if (session) {
                const userData = await authService.getCurrentUser();
                if (userData) {
                    dispatch(authLogin(userData))
                }
                navigate('/')
            }
            
        } catch (error) {
            setError(error.message)
        }
        finally{
            setLoading(false)
        }
    }
    return (
        <div className="flex items-center justify-center w-full min-h-[80vh] py-12 px-6">
            <div className="mx-auto w-full max-w-md glass-dark rounded-[2.5rem] p-10 md:p-12 border border-white/5 shadow-2xl relative overflow-hidden group">
                {/* Decorative Elements */}
                <div className="absolute -top-24 -right-24 w-48 h-48 bg-primary/10 rounded-full blur-3xl group-hover:bg-primary/20 transition-all duration-700"></div>
                <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-primary/5 rounded-full blur-3xl group-hover:bg-primary/10 transition-all duration-700"></div>

                <div className="mb-8 flex flex-col items-center gap-4 relative">
                    <Logo className="scale-125" />
                    <div className="text-center space-y-1">
                        <h2 className="text-3xl font-bold tracking-tight text-white">Welcome back</h2>
                        <p className="text-muted-foreground text-sm">Please enter your details to sign in</p>
                    </div>
                </div>

                {error && (
                    <div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded-2xl text-red-500 text-xs font-medium text-center animate-in fade-in slide-in-from-top-2">
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit(login)} className="space-y-6 relative">
                    <div className="space-y-4">
                        <Input
                            label='Email Address'
                            placeholder='name@example.com'
                            type='email'
                            autoComplete="email"
                            {...register("email", {
                                required: "Email is required",
                                validate: {
                                    matchPattern: (val) => /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/.test(val) || "Email address must be a valid address"
                                }
                            })}
                        />
                        <Input
                            label='Password'
                            type='password'
                            placeholder='••••••••'
                            autoComplete="current-password"
                            {...register("password", {
                                required: "Password is required",
                            })}
                        />
                    </div>

                    <Button
                        type="submit"
                        variant="primary"
                        className="w-full py-4"
                        disabled={loading}
                    >
                        {loading ? 'Authenticating...' : 'Sign In'}
                    </Button>

                    <p className="text-center text-sm text-muted-foreground pt-4">
                        Don&apos;t have an account?&nbsp;
                        <Link
                            to="/signup"
                            className="font-bold text-white hover:text-primary transition-colors"
                        >
                            Sign Up
                        </Link>
                    </p>
                </form>
            </div>
        </div>
    )
}

export default Login