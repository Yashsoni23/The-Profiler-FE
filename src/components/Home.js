import React, { useState } from 'react'
import Login from './Login';
import Userargistration from './UserRagistration';

const Home = () => {
    const [showRagistration, setshowRagistration] = useState(false);

    return (
        <>
            <div className="w-screen main-con  h-screen bg-purple-300  flex items-end justify-end " >
                <div className=" flex w-1/2 h-full relative logo">
                    <div style={{ boxShadow: " 0 0 10px #FBCFE2" }} className="flex bg-purple-400 float-right absolute right-0 rounded-l-3xl  w-4/5 h-4/5">
                        <div className="img overflow-hidden rounded-2xl bg-black w-4/5 h-4/5">
                            <img src="/Profiler.PNG" className=" h-full" alt="" />
                        </div>
                    </div>

                </div>

                <div className="flex fd-column ls-home relative justify-self-end sm:w-1/2 lg:w-1/2 h-full rounded-tl-3xl z-10 shadow-[0_0_10px_rgba(255,255,255,1)]  bg-purple-600   float-right">
                    <div className="slogan absolute top-20 rounded-full overflow-hidden shadow-[0_0_10px_rgba(255,255,255,1)] bg-black w-4/5 h-16">
                        <img src="/slogan.PNG" className="w-full h-full" alt="" />
                    </div>
                    <div className=" fd-column w-full  flex ">
                        {
                            showRagistration === true ? <Userargistration /> : <Login />
                        }
                        <h1 className="font-bold mt-4 text-purple-900 text-xl ">{showRagistration ? "Already" : "Don't"} Have Account <button onClick={() => showRagistration ? setshowRagistration(false) : setshowRagistration(true)} className="font-bold hover:text-pink-200 text-white ">{showRagistration ? "Login" : "Ragister"}</button></h1>
                    </div>
                </div>
            </div>




        </>
    )
}

export default Home