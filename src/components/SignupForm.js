import React, { useState } from 'react'
import { toast } from "react-hot-toast"
import { UseDispatch, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'

export default function SignupForm() {
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        confimPassword: "",
    })

    const [showPassword, setShowPassword] = useState(false)
    const [showConfirmPassword, setShowConfirmPassword] = useState(false)

    const { firstName, lastName, email, password, confimPassword } = formData

    const handleOnChange = (e) => {
        setFormData((prevData) => ({
            ...prevData,
            [e.target.name]: e.target.value,
        }))
    }

    const handleOnSubmit = (e) => {
        e.preventDefault()

        if (password !== confimPassword) {
            toast.error("Password Do not Match")
            return
        }
        const signupData = {
            ...formData,
        }

        dispatch(setSignupData(signupData))

        dispatch(sendOtp(formData.email, navigate))

        setFormData({
            firstName: "",
            lastName: "",
            email: "",
            password: "",
            confimPassword: "",
        })
    }
    return (
        <div>
            <form onSubmit={handleOnSubmit} className='flex w-full flex-col gap-y-4'>
                <div className='flex gap-x-4'>
                    <label>
                        <p className='mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5'>First Name</p>
                        <input
                            type="text"
                            required
                            name="firstName"
                            value={firstName}
                            onChange={handleOnChange}
                            placeholder='Enter first name'
                            className='form-style w-full'
                        />
                    </label>
                    <label htmlFor="">
                        <p className='mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5'>Last Name</p>
                        <input
                            type="text"
                            required
                            name="lastName"
                            value={lastName}
                            onChange={handleOnChange}
                            placeholder='Enter last name'
                            className='form-style w-full'
                        />
                    </label>
                    <label htmlFor="">
                        <p className='mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5'>Email</p>
                        <input
                            type="text"
                            required
                            name="email"
                            value={email}
                            onChange={handleOnChange}
                            placeholder='Enter email'
                            className='form-style w-full'
                        />
                    </label>
                    <label htmlFor="">
                        <p className='mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5'>Password</p>
                        <input
                            type={showPassword ? "text" : "password"}
                            required
                            name="password"
                            value={password}
                            onChange={handleOnChange}
                            placeholder='Enter password'
                            className='form-style w-full'
                        />
                    </label>
                    <label htmlFor="">
                        <p className='mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5'>Confirm Password</p>
                        <input
                            type={showConfirmPassword ? "text" : "password"}
                            required
                            name="confimPassword"
                            value={confimPassword}
                            onChange={handleOnChange}
                            placeholder='Enter confirmPassword'
                            className='form-style w-full !pr-10'
                        />
                    </label>
                </div>
                <button type='submit' className='mt-6 rounded-[8px] bg-yellow-50 py-[8px] px-[12px] font-medium text-richblack-900'>Create Account</button>
            </form>
        </div>
    )
}
