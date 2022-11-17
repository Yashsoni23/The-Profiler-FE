import React, { useState, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
const Login = () => {
    const validIndi = useRef();

    const [error, setError] = useState("");
    const Navigate = useNavigate();
    const [userData, setuserData] = useState({ username: "", password: "" });
    const handleChange = (e) => {
        setuserData({
            ...userData,
            [e.target.name]: e.target.value
        });
    }

    const validation = () => {
        if (!userData.username) {
            validIndi.current.classList.remove("dnone");
            setError("Please Enter your name");
            return false;
        }
        else if (!userData.password) {
            validIndi.current.classList.remove("dnone");
            setError("Please Enter your password");
            return false;
        }
        validIndi.current.classList.add("dnone");
        setError("Login Successful");
        return true;

    }

    const Loginconfirm = async ()=>{
        try {
            const res = await axios.post('https://theprofiler26.adaptable.app/user/login',{ 
                username: userData.username, password: userData.password });            
            console.log(res.data);
            console.log(userData);
            if(res.data.token){
                Navigate('/main', { state: {_id: res.data._id, username: userData.username, password: userData.password ,token:res.data.token } });
            }

        } catch (error) {
            if (error.response) {
                console.log(error.response);
                console.log("server responded");
              } else if (error.request) {
                console.log("network error",error.response);
              } else {
                console.log(error);
              }
        }
    }
    const promlogin = ()=>{
        axios.post('https://theprofiler26.adaptable.app/user/login',userData).then((result)=>{
                console.log(result.data);
                
            }).catch(error=>{
                if(error.request){
                    console.log("request error");
                }
                else if(error.response){
                    console.log("server responded")
                }
                else{
                    console.log(error);
                }
            })
    }
    const Login = () => {
        const isvalid = validation();

        if (isvalid) {
            Loginconfirm()
        }
    }

    return (
        <>

            <div className=" flex fd-column gap-1">
                <h1 className="font-bold pl-10 pr-10 text-2xl text-pink-200">Login/Existing User</h1>

                <div className=" w-full   flex fd-column gap-1">
                    <input className="w-full p-1 font-bold placeholder:font-bold pl-2 text-md focus:shadow-[0px_0px_10px_rgba(255,255,255,0.5)]    rounded-sm focus:border-pink-600 focus:border-2 focus:outline-none  focus:rounded-lg" onChange={handleChange} name="username" placeholder='username or email' type="text" />
                    <input className="w-full p-1 font-bold placeholder:font-bold pl-2 text-md focus:shadow-[0px_0px_10px_rgba(255,255,255,0.5)]  rounded-sm focus:border-pink-600 focus:border-2 focus:outline-none  focus:rounded-lg" onChange={handleChange} value={userData.password} placeholder='Enter Your Password' type="password" name="password" id="password" />
                </div>
                <button className="text-xl shadow-[0px_0px_10px_rgba(255,255,255,0.5)] hover:rounded-full font-bold w-full rounded-sm hover:bg-white hover:text-pink-600 hover:border-pink-600 transition p-1 hover:border-2 text-yellow-50 bg-pink-600" onClick={Login}>Login</button>
                <div className=" w-full p-2 flex shadow-[0px_0px_10px_rgba(255,255,255,0.5)] dnone border-red-600 border-2 bg-purple-50  mt-5" ref={validIndi}>
                <h3 className="text-red-600 font-bold ">{error}</h3>
            </div>
            </div>
            


        </>
    )
}

export default Login