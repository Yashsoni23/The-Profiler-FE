import React, { useState, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

const Userargistration = () => {
    const validIndi = useRef();
    const msg = useRef();
    const Navigate = useNavigate();

    const [error, setError] = useState("");
    const [userData, setuserData] = useState({ username: "", email: "", password: "", confirmPassword: "" });
    const handleChange = (e) => {
        setuserData({
            ...userData,
            [e.target.name]: e.target.value,
            [e.target.password]: e.target.value
        });
    }
    const validation = () => {
        if (!userData.username) {
            validIndi.current.classList.remove("dnone");
            setError("Please Enter your name");
            return false;
        }
        else if (!userData.email) {
            validIndi.current.classList.remove("dnone");
            setError("Please Enter your Email");
            return false;
        }
        else if (!userData.password) {
            validIndi.current.classList.remove("dnone");
            setError("Please Enter your password");
            return false;
        }
        else if (!userData.confirmPassword) {
            validIndi.current.classList.remove("dnone");
            setError("Please Confirm your Password");
            return false;
        } else if (userData.password !== userData.confirmPassword) {
            validIndi.current.classList.remove("dnone");
            setError('Password & Confirm Password are should to be Same please try again');
            return false;
        }
        validIndi.current.classList.add("dnone");
        setError("Login Successful");
        return true;

    }

    const Ragisterconfirm = async () => {
        try {
            const res = await axios.post("https://theprofiler26.adaptable.app/user/signup", userData);
            console.log(res.data);
            console.log(userData);
            if (res.data) {
                msg.current.classList.remove("hidden");
                setTimeout(() => {
                    msg.current.classList.add("hidden");
                }, 2000);
            }
            // Navigate('/main', { state: userData });  
        } catch (error) {
            if (error.response) {
                console.log(error.response);
                console.log("server responded");
            } else if (error.request) {
                console.log("network error", error.response);
            } else {
                console.log(error);
            }
        }
    }
    const Ragister = () => {
        const isvalid = validation();
        if (isvalid) {
            // Navigate('/main', { state: userData });
            Ragisterconfirm();
        }
    }
    return (
        <>
            <div className=" flex fd-column gap-1">
                <h1 className="font-bold  text-2xl text-pink-200">Create Account / New User </h1>
                <div className=" w-full  flex fd-column gap-1">
                    <input className="w-full font-bold placeholder:font-bold pl-2 p-1 text-md focus:shadow-[0px_0px_10px_rgba(255,255,255,0.5)]    rounded-sm focus:border-pink-600 focus:border-2 focus:outline-none  focus:rounded-lg" onChange={handleChange} name="username" placeholder='Enter Your Name' type="text" />
                    <input className="w-full font-bold placeholder:font-bold pl-2 p-1 text-md focus:shadow-[0px_0px_10px_rgba(255,255,255,0.5)]    rounded-sm focus:border-pink-600 focus:border-2 focus:outline-none  focus:rounded-lg" onChange={handleChange} name="email" value={userData.email} placeholder='Enter Your Email' type="email" />
                    <input className="w-full font-bold placeholder:font-bold pl-2 p-1 text-md focus:shadow-[0px_0px_10px_rgba(255,255,255,0.5)]    rounded-sm focus:border-pink-600 focus:border-2 focus:outline-none  focus:rounded-lg" onChange={handleChange} placeholder='Enter Your Password' type="password" name="password" id="password" />
                    <input className="w-full font-bold placeholder:font-bold pl-2 p-1 text-md focus:shadow-[0px_0px_10px_rgba(255,255,255,0.5)]    rounded-sm focus:border-pink-600 focus:border-2 focus:outline-none  focus:rounded-lg" onChange={handleChange} value={userData.confirmPassword} placeholder='Confirm Your Password' type="password" name="confirmPassword" id="password" />
                </div>
                <button className="text-xl shadow-[0px_0px_10px_rgba(255,255,255,0.5)] hover:rounded-full font-bold w-full rounded-sm hover:bg-white hover:text-pink-600 hover:border-pink-600 transition p-1 hover:border-2 text-yellow-50 bg-pink-600" onClick={Ragister}>Ragister</button>

                <div ref={msg} className="msg hidden w-full bg-green-500 border-2 rounded-md"><h1 className="text-white text-center font-bold p-2">User Ragistration Successful!!</h1></div>

            </div>

            <div className=" w-full p-2 flex shadow-[0px_0px_10px_rgba(255,255,255,0.5)] dnone border-red-600 border-2 bg-purple-50  mt-5" ref={validIndi}>
                <h1 className="text-red-600 font-bold ">{error}</h1>
            </div>

        </>
    )
}

export default Userargistration