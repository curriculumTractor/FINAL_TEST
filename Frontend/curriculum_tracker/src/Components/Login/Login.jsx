import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify';
import axios from 'axios'
import styles from "./styles.module.css"

const Login = () => {


    const [credentials, setCredentials] = useState(
        {
            email: "",
            password: "",
            role: ""
        })
    let role = ["admin", "user"]
    const navigate = useNavigate();


   
    const login_api_call = async (email, password, role) => {
        const response = await fetch("/login", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'

            },
            body: JSON.stringify({ email: email, password: password, role: role })
        });
        const json = await response.json();
        console.log(json);
        console.log(json.status)
        if (json.status == "success") {

            if (json.data[0].email === "admin@gmail.com") {
                localStorage.setItem('token', json.token);
                navigate("/admin");
                toast.success("login Successfully");
            } else {
                localStorage.setItem('token', json.token);
                navigate("/user");
            }
        } else {
            toast.error("invalid credentials");
        }

    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (credentials.email === "admin@gmail.com" && credentials.role === "admin") {
            login_api_call(credentials.email, credentials.password, credentials.role)
        } else if (credentials.email !== "admin@gmail.com" && credentials.role !== "admin") {
            login_api_call(credentials.email, credentials.password, credentials.role)
        } else {
            alert("Please Check Your Credentials or User Type")
        }

    }

    const onChange = (e) => {
        setCredentials(
            {
                ...credentials,
                [e.target.name]: e.target.value
            });
    }

    return (

        <div className={styles.login_container}>
            <div className={styles.login_form_container}>
                <div className={styles.left}>
                    <form className={styles.form_container} onSubmit={handleSubmit}>
                        <h1>Login to Your Account</h1>

                        <div>
                            <select className="form-select form-select-lg" required={true} id="role" name="role" value={credentials.role} onChange={onChange} style={{ backgroundColor: "aliceblue", fontWeight: "500" }}>
                                <option defaultValue >Select Role</option>
                                <option value="admin">Admin</option>
                                <option value="user">User</option>

                            </select>
                        </div>


                        <input
                            type="email"
                            placeholder="Email"
                            name="email"
                            value={credentials.email}
                            onChange={onChange}

                            required
                            className={styles.input}
                        />
                        <input
                            type="password"
                            placeholder="Password"
                            name="password"
                            value={credentials.password}
                            onChange={onChange}

                            required
                            className={styles.input}
                        />

                        <button type="submit" className={styles.green_btn} >
                            Sign In
                        </button>
                    </form>
                </div>
                <div className={styles.right}>
                    <h1>New Here ?</h1>
                    <Link to="/signup">
                        <button type="button" className={styles.white_btn} >
                            Sign Up
                        </button>
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default Login