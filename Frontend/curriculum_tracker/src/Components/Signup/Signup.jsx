import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import {useForm} from 'react-hook-form'
import styles from './styles.module.css'

const Signup = () => {
    
	const navigate = useNavigate()
	const {register, formState: {errors}, handleSubmit} = useForm();
	const [data,setData]=useState({
			firstName:"",
			lastName:"",
			email: "",
			username:"",
			password:"",
			confirmPassword:"",
			
	})

	const onSubmit = (data) => console.log(data)
	const signUpData =()=>{
		
		console.log(data)
		axios.post("/signup",data)
		.then((response)=>{
			
			console.log(response.data)
			if(response.data.status=="success"){

				navigate('/login')
				let token=response.data.token
				sessionStorage.setItem("token",token);
				alert("user registered successfully")
				setData(
					{
						firstName:"",
						lastName:"",
						email: "",
						username:"",
						password:"",
						confirmPassword:"",
						
					}
				)
			}
			alert(response.data.message||response.data.status)
		})
		.catch((error)=>{
			console.log(error)
		})
	}
	  
	const inputHandler = (event)=>{
		  const {name,value}=event.target 
		  setData(
			(previousState)=>({
			  ...previousState,
			  [name]:value
			})
		  )
		}

  return (
    <div>
        <div className={styles.signup_container}>
        	<div className={styles.signup_form_container}>
                <div className={styles.left}>
                    <h1>Welcome Back</h1>
                        <Link to ="/login">
                            <button type='button' className={styles.white_btn}>
                                Sign In
                            </button>
                        </Link>
                </div>
                <div className={styles.right}>
                    <form onSubmit={handleSubmit(signUpData)} className={styles.form_container}>
                        <h1>Create Account</h1>
                        <input
							type="text"
							placeholder="First Name"
							{...register("firstName",{required: true})}	
							onChange={inputHandler}
							value={data.firstName}
							className={styles.input}
						/>
						<error>
							{errors.firstName?.type === "required" && "First name is required"}
						</error>
						<input
							type="text"
							placeholder="Last Name"
							{...register("lastName",{required: true})}	
							name="lastName"
							onChange={inputHandler}
							value={data.lastName}
							className={styles.input}
						/>
						<error>
							{errors.lastName?.type === "required" && "Last name is required"}
						</error>
						<input
							type="email"
							placeholder="Email"
							{...register("email", {
							required: true,
							pattern: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/i,
							})}
							name="email"
							onChange={inputHandler}
							value={data.email}
							className={styles.input}
						/>
						<error>
          					{errors.email?.type === "required" && "Email is required"}
           					{errors.email?.type === "pattern" &&
              					"Entered email is in wrong format"}
          				</error>
						<input
							type="text"
							placeholder="Username"
							{...register("username",{required: true})}	
							name="username"
							onChange={inputHandler}
							value={data.username}
							className={styles.input}
						/>
						<error>
							{errors.username?.type === "required" && "Username is required"}
						</error>
						<input
							type="password"
							placeholder="Password"
							{...register("password", {
								required: true,
								minLength: 5,
								maxLength: 10,
							})}
							name="password"
							onChange={inputHandler}
							value={data.password}
							className={styles.input}
						/>
						<error>
							{errors.password?.type === "required" && "Password is required"}
            				{errors.password?.type === "minLength" &&
             					"Entered password is less than 5 characters"}
           					{errors.password?.type === "maxLength" &&
            					"Entered password is more than 10 characters"}
          				</error>
						<input
							type="password"
							placeholder="Confirm Password"
							{...register("confirmPassword", {
								required: true,
								minLength: 5,
								maxLength: 10,
							})}
							name="confirmPassword"
							onChange={inputHandler}
							value={data.confirmPassword}
							className={styles.input}
						/>
						<error>
							{errors.confirmPassword?.type === "required" && "Confrim Password is required"}
            				{errors.confirmPassword?.type === "minLength" &&
             					"Entered password is less than 5 characters"}
           					{errors.confirmPassword?.type === "maxLength" &&
            					"Entered password is more than 10 characters"}
          				</error>
						<button type="submit" className={styles.green_btn}  >
							Sign Up
						</button>
					</form>
                </div>
            </div>
        </div>
    </div>
       
  
  )
}

export default Signup