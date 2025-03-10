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
        <div className="flex items-center justify-center w-full ">
            <div className={`mx-auto w-full max-w-lg bg-gray-100 rounded-xl p-10 border border-black/10`}>
                <div className="mb-2 flex justify-center">
                    <span className="inline-block w-full max-w-[100px]">
                        <Logo width='100%' />
                    </span>
                </div>
                <h2 className="text-center text-2xl font-bold leading-tight">Sign in to your account</h2>
                <p className="mt-2 text-center text-base text-black/60">
                    Don&apos;t have any account?&nbsp;
                    <Link
                        to="/signup"
                        className="font-medium text-primary transition-all duration-200 hover:underline"
                    >
                        Sign Up
                    </Link>
                </p>
                {error && <p className="text-red-800 mt-8 text-center">{error}</p>}
                <form onSubmit={handleSubmit(login)}
                    className="mt-8">
                    <div className="space-y-5">
                        <Input
                            label='Email: '
                            placeholder='Enter Your Email'
                            type='email'
                            {...register("email", {
                                required: true,
                                validate: {
                                    matchPattern: (val) => /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/.test(val) || "Email address must be a valid address"
                                }
                            })}
                        />
                        <Input
                            label='Password'
                            type='password'
                            placeholder='Enter your password'
                            {...register("password", {
                                required: true,

                            })}
                        />
                        {
                            loading ?
                                <Button
                                    children="Signing In..."
                                    className="w-full text-white"
                                />
                                :
                                <Button
                                    children="Sign In"
                                    type="submit"
                                    className="w-full"
                                />
                        }

                    </div>

                </form>
            </div>
        </div>
    )
}

export default Login