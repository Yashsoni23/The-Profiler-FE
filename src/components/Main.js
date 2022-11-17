import React, { useEffect, useState, useRef } from 'react';
import { useLocation } from "react-router-dom";
import { AiOutlineInstagram, AiOutlineGithub, AiOutlineLinkedin, AiFillCloseCircle } from 'react-icons/ai'
import { BsPlusCircle } from 'react-icons/bs'
import { CgProfile } from 'react-icons/cg'
import { IoIosCog } from 'react-icons/io'
import { FaRegEdit } from 'react-icons/fa'
import axios from 'axios';

const Main = () => {
    const location = useLocation();
    const form = useRef();
    const myProfile = useRef();
    const validIndi = useRef();
    const msg = useRef();
    const popup = useRef();
    const uniqueList = ["All", "CEO", "Employ"];
    let getUrl;


    const [url, setUrl] = useState("");
    const [ProfileNav, setProfileNav] = useState(uniqueList);
    const [userDetail, setuserDetail] = useState({});
    const [profileApi, setProfileApi] = useState([]);
    const [disabled, setdisabled] = useState(true);
    const [error, setError] = useState("");
    const [permenentData, setPermenentData] = useState([]);
    const [updateDetails, setUpdateDetails] = useState({ username: "", password: "" });
    const [updatedDetail, setUpdatedDetail] = useState([]);
    const [viewData, setViewData] = useState({ name: "", gender: "", email: "", category: "", url: "", about: "" });

    const [profileData, setProfileData] = useState(
        {
            name: "",
            email: "",
            gender: "",
            about: ""
        }
    )
    // GETTING DATA FROM LOGIN PAGE VIA USEEFFECT
    useEffect(() => {
        setuserDetail(location.state);
    }, [location.state]);



    // ---------------------------------------------------------VALIDATION FUNCTIONS START---------------------------------------------------------


    const validation = () => {
        if (!profileData.name) {
            validIndi.current.classList.remove("dnone");
            setError("Please Enter Profile name");
            return false;
        }
        else if (!profileData.email) {
            validIndi.current.classList.remove("dnone");
            setError("Please Enter Profile Email");
            return false;
        }
        else if (!profileData.about) {
            validIndi.current.classList.remove("dnone");
            setError("Please Enter About Profile ");
            return false;
        } validIndi.current.classList.add("dnone");
        setError("");
        return true;
    }
    const validationForUpdate = () => {
        const regex = RegExp(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/gm).test(updateDetails.password);
        if (!updateDetails.username) {
            validIndi.current.classList.remove("dnone");
            setError("Please Enter the New Username ");
            return false;
        }
        else if (!updateDetails.password) {
            validIndi.current.classList.remove("dnone");
            setError("Please Enter the New Password ");
            return false;
        }
        if (updateDetails.username === updateDetails.password) {
            validIndi.current.classList.remove("dnone");
            setError("Username and Password Should not be same");
            return false;
        } else if (!regex) {
            validIndi.current.classList.remove("dnone");
            setError(" Password requires Minimum 8 characters, at least 1 uppercase letter, 1 lowercase letter, 1 number and 1 special character:")
            return false;
        }
        setError("");
        validIndi.current.classList.toggle("dnone");

        return true;
    }
    // ---------------------------------------------------------VALIDATION FUNCTIONS END---------------------------------------------------------


    // --------------------------------------------------------- API INTIGRATION START---------------------------------------------------------------------
    // FOR GETTING PROFILES
    const getProfileFromApi = async () => {
        try {
            const data = await axios.get("https://theprofiler26.adaptable.app/profile/all_profile");
            setProfileApi(data.data);
            setPermenentData(data.data);
        } catch (error) {
            console.log(error);
        }
    }

    // FOR GETTING USER DETAILS WHICH  WAS LOGGED IN

    const getCurrrentUserDetail = async () => {
        const _id = userDetail._id;

        const res = await fetch(`https://theprofiler26.adaptable.app//user/${_id}`, {
            method: 'get',
        }).then(result => {
            setUrl(result.url);
            getUrl = result.url
        }).catch(err => console.log(err));

        try {
            const data = await axios.get(getUrl);
            setUpdatedDetail(data.data);
        } catch (error) {
            console.log(error);
        }
    }


    // FOR UPDATE CURRENT USER DETAILS

    const updateCurrentUser = async () => {
        try {
            const data = await axios.patch(`${url}`, updateDetails);
            console.log(data.data);
            setUpdatedDetail(data.data);
            setUpdateDetails({ ...updateDetails, username: "", password: "" });
            setdisabled(!disabled);
            if (data.data) {
                msg.current.classList.remove("hidden");
                setTimeout(() => {
                    msg.current.classList.add("hidden");
                }, 2000);
            }
        } catch (error) {
            console.log(error)
        }
    }
    //  CREATING NEW PROFILES  BY CLICKING SUBMIT  BUTTON (API INTIGRATED INSIDE SUBMIT FUNCTION)


    const CreateProfile = (e) => {
        const isValid = validation();
        if (isValid) {
            const formData = new FormData();
            fetch("https://theprofiler26.adaptable.app/profile/new-profile", {
                method: 'post',
                body: new formData()
            }).then(res => console.log(res)).catch(err => console.log(err));
        }
        e.preventDefault();
    }
    // --------------------------------------------------------- API INTIGRATION END---------------------------------------------------------------------

    //    CALLING API OF PROFILES AND CURRENTUSER WHICH WAS LOFFED IN
    useEffect(() => {
        getProfileFromApi();
        getCurrrentUserDetail();
    }, [userDetail])


    // --------------------------------------------------------- ON CHANGE FUNCTION DEFINATIONS---------------------------------------------------------

    const handleUpdateChange = (e) => {
        const { name, value } = e.target;
        setUpdateDetails({
            ...updateDetails,
            [name]: value
        });
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProfileData(() => {
            return {
                ...profileData,
                [name]: value,
            }
        })
    }

    // ---------------------------------------------------------SUBMIT BUTTONS START---------------------------------------------------------

    const updateUserDetail = (e) => {
        e.preventDefault();
        const isValid = validationForUpdate();
        if (isValid) {
            updateCurrentUser();
        }
        console.log(updateDetails);
    }

    // ---------------------------------------------------------SUBMIT BUTTONS END---------------------------------------------------------

    // --------------------------------------------------------- MORE SOME FUNCTION  FOR MINOR FEATURES---------------------------------------------------------
    const filterProfiles = (category) => {

        if (category === "All") {
            return setProfileApi(permenentData);
        }
        const updateProfile = permenentData.filter((curElem) => {
            return curElem.category === category;
        });
        setProfileApi(updateProfile);

    }

    const showForm = () => {
        form.current.classList.toggle('hidden');
    }

    const showProfile = () => {
        myProfile.current.classList.toggle("hidden");

    }
    const showPopUp =()=>{
        popup.current.classList.toggle('hidden')
    }


    // --------------------------------------------------------- ALL LOGIC ENDED  AFTER THIS ALL CODE IS MAIN FRONT-END---------------------------------------------------------

    return (
        <>
            <div className="flex fd-column overflow-hidden pb-10 h-full relative scroll-smooth main-container items-center  content-center">
                {/* <h1 className=" text-4xl text-gray-300    uppercase bg-red-500 hover:bg-blue-400  font-bold">
                    Hello world from Main page side
                </h1> */}
                <div ref={myProfile} className=" overflow-hidden hidden w-screen h-screen  ">
                    <div className="flex w-full h-full bg-gradient-to-t from-pink-700 to-purple-300">
                        <div className="flex bg-pink-400 relative  shadow-[0_0_20px_rgba(0,0,0,1)] w-[40rem] h-[40rem] rounded-full">
                            <IoIosCog className="w-full h-full text-blue-800 rounded-full -rotate-90 " />
                            <div className="user-detail bg-opacity-70 bg-blue-800 shadow-[0_0_10px_rgba(255,255,255,1)] bg p-12 rounded-3xl flex fd-column gap-4  absolute">
                                <h1 className="font-bold pl-10 pr-10 text-2xl text-pink-200 hover:text-cyan-300">Your Profile</h1><FaRegEdit onClick={() => setdisabled(!disabled)} className="text-2xl absolute right-3 top-3 text-pink-200 cursor-pointer hover:text-cyan-300" />
                                <div className="flex fd-column  text-justify gap-3">
                                    <h1 className="font-bold w-full  text-justify  text-xl text-cyan-300">Username:- {updatedDetail.username}</h1>
                                    <h1 className="font-bold w-full  text-center   text-xl text-cyan-300">Password:- #######</h1>
                                </div>
                                <div ref={msg} className="msg hidden w-full bg-green-500 border-2 rounded-md"><h1 className="text-white text-center font-bold p-2">Your Details are Successfully Updated!!</h1></div>

                                <form className="flex gap-4 fd-column">
                                    {
                                        !disabled ? (
                                            <>

                                                <input disabled={disabled} value={updateDetails.username} className="w-full p-1 text-center text-pink-600 disabled:text-cyan-300 disabled:bg-blue-900 disabled:shadow-[0_0_10px_rgba(255,255,255,1)] shadow-[0_0_10px_#be185d] font-bold placeholder:font-bold pl-2 text-md focus:shadow-[0px_0px_10px_rgba(255,255,255,0.5)]    rounded-sm focus:border-pink-600 focus:border-2 focus:outline-none  focus:rounded-lg" onChange={handleUpdateChange} name="username" placeholder='Enter new username ' type="text" />
                                                <input disabled={disabled} value={updateDetails.password} className="w-full text-center p-1 text-pink-600 disabled:text-cyan-300 disabled:bg-blue-900 disabled:shadow-[0_0_10px_rgba(255,255,255,1)] shadow-[0_0_10px_#be185d] font-bold placeholder:font-bold pl-2 text-md focus:shadow-[0px_0px_10px_rgba(255,255,255,0.5)]    rounded-sm focus:border-pink-600 focus:border-2 focus:outline-none  focus:rounded-lg" onChange={handleUpdateChange} name="password" placeholder='Enter new password' type="text" />

                                                <button onClick={updateUserDetail} disabled={disabled} className="text-xl shadow-[0px_0px_10px_rgba(255,255,255,0.5)] hover:rounded-full font-bold w-full rounded-sm hover:bg-white hover:text-pink-600 hover:border-pink-600 transition p-1 hover:border-2 text-yellow-50 bg-pink-600">Update</button>
                                                <div className=" w-full p-2 flex shadow-[0px_0px_10px_rgba(255,255,255,0.5)] dnone border-red-600 border-2 bg-purple-50  mt-5" ref={validIndi}>
                                                    <h3 className="text-red-600 font-bold ">{error}</h3>
                                                </div>
                                            </>
                                        ) : ""
                                    }

                                </form>
                            </div>
                        </div>
                    </div>
                </div>
                <nav className="flex w-screen pt-8   bg-gradient-to-t from-white to-red-300 ">
                    <ul className="flex sm:text-sm  shadow-[0_10px_10px_rgba(253,210,210,1)] bg-gradient-to-r from-purple-500 to-pink-500 rounded-md lg:rounded-2xl shedow-2xl">
                        {
                            ProfileNav.map((curElem) => {
                                const category = curElem;
                                return (
                                    <>
                                        <button onClick={() => filterProfiles(curElem)} className="sm:text-sm lg:text-2xl lg:p-4 sm:p-2 p-1 text-xs  cursor-pointer hover:border-b-4  border-white rounded-md lg:rounded-2xl text-blue-50 rad font-extrabold">{category}</button>
                                    </>
                                )

                            })
                        }

                    </ul>
                    <div className="my-profile  pl-5">
                        <CgProfile onClick={showProfile} className="profile hover:text-pink-600 sm:text-5xl lg:text-5xl cursor-pointer text-purple-700 bg-white shadow-[0_0px_20px_#f94ba1] rounded-full" />

                    </div>
                </nav>
                <div className="flex fdp fd-column flex-wrap m-8 gap-4 rounded-lg  p-8 shadow-[0_0px_40px_0px_rgba(200,200,200,1)]  bg-gradient-to-b from-white to-red-300">

                    <button onClick={showForm} className=" p-3 gap-2 hover:border-purple-300 hover:border-l-8  font-bold flex text-yellow-50  hover:bg-purple-900 text-2xl  bg-purple-800 rounded-md"><BsPlusCircle style={{ fontSize: "2rem" }} />Create Profile</button>
                    <div ref={form} className="hidden duration-1000 form justify-center transition-all items-center  rounded-lg bg-red-100">

                        <div className="form overflow-hidden flex fd-column gap-4 p-6 w-full rounded-lg  h-4/5 bg-red-100 ">


                            <form action="https://theprofiler26.adaptable.app/profile/new-profile" method='POST' className="flex fd-column w-full gap-4 p-6" encType="multipart/form-data">


                                <input onChange={handleChange} value={profileData.name} type="text" name="name" placeholder="Vyom m Parikh" className="w-full text-xl pl-4  rounded-lg focus:outline-none focus:border-pink-500 focus:ring-2 focus:ring-pink-500 p-1  font-bold" />

                                <input onChange={handleChange} value={profileData.email} type="email" name="email" placeholder="Vyom@exmple.com" className="w-full text-xl pl-4   rounded-lg focus:outline-none focus:border-pink-500 focus:ring-2 focus:ring-pink-500 p-1  font-bold " />


                                <div className="flex sm:gap-20">
                                    <div className="flex gap-2">

                                        <input className="w-6 h-6 text-pink-600 rounded-full bg-pink-100  dark:focus:ring-pink-600  dark:bg-pink-700 dark:border-pink-600" type="radio" name="gender" id="Male" value="Male" />
                                        <label className="text-purple-600  text-xl font-bold " htmlFor="Male">Male</label>

                                        <input value="female" className="w-6 h-6 text-pink-600 rounded-full bg-pink-100  dark:focus:ring-pink-600  dark:bg-pink-700 dark:border-pink-600" type="radio" name="gender" id="female" />
                                        <label htmlFor="female" className="text-purple-600  text-xl font-bold">Female</label>
                                    </div>


                                    <div className="flex gap-2">
                                        <input className="w-6 h-6 text-pink-600 rounded-full bg-pink-100  dark:focus:ring-pink-600  dark:bg-pink-700 dark:border-pink-600" type="radio" name="category" id="CEO" value="CEO" />
                                        <label className="text-purple-600  text-xl font-bold " htmlFor="CEO">CEO</label>

                                        <input value="Employ" className="w-6 h-6 text-pink-600 rounded-full bg-pink-100  dark:focus:ring-pink-600  dark:bg-pink-700 dark:border-pink-600" type="radio" name="category" id="Employ" />
                                        <label htmlFor="Employ" className="text-purple-600  text-xl font-bold">Employ</label>

                                    </div>
                                </div>

                                <input onChange={handleChange} type="file" name="photo" placeholder="Vyom@exmple.com" className="block w-full text-sm text-slate-500 focus:outline-none pl-4 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-violet-50 file:text-violet-700 hover:file:bg-violet-100 focus:border-pink-500 focus:ring-2 focus:ring-pink-500 p-1  font-bold" />
                                <textarea onChange={handleChange} value={profileData.about} type="text" name="about" placeholder="I am Vyom Studing xyz university .I like to Travel and interact with peaople say me about you briefly as How I  said atleast type 3 line(30 words) "
                                    className="w-full placeholder:text-justify h-[6rem] overflow-hidden resize-none text-md rounded-lg focus:outline-none focus:border-pink-500 focus:ring-2 focus:ring-pink-500 p-1  font-bold" />
                                <button onClick={CreateProfile} className=" p-1 w-full text-white text-xl font-bold rounded-lg hover:bg-pink-700 bg-pink-600">Create</button>
                            </form>



                            <div className="error-con red flex dnone bigerror" ref={validIndi}>
                                {error}
                            </div>



                        </div>
                    </div>


                    <div className="flex relative flex-wrap gap-4">

                        {
                            profileApi.map((Elem) => {
                                const { id, name, gender, email, category, url, about } = Elem;
                                return (
                                    <>
                                        <div onClick={() => setViewData({ ...viewData, name, gender, email, category, url, about })} className="flex p-4 shadow-[0_0px_20px_0px_rgba(255,255,255,1)] bg-purple-500 fd-column rounded-lg min-h-max">
                                            <div className="flex-photo flex">
                                                <div className="flex overflow-hidden  sm:w-[10rem] sm:h-[10rem] w-[13rem] h-[13rem] bg-fuchsia-400">
                                                    <img src={url} className="w-full" alt="" />
                                                </div>
                                            </div>
                                            <div className="content text-justify ">
                                                <h1 className="font-bold text-yellow-100 text-center pt-3 text-xl sm:text-xl lg:text-2xl">{Elem.name}</h1>
                                                <p className="lg:w-[15rem] w-[15rem] font-semibold text-white  p-3 sm:text-sm lg:text-md">{about.slice(0, 100)} <button onClick={showPopUp} className="text-yellow-100 font-bold float-right pt-3">....Read more</button></p>
                                            </div>
                                        </div>
                                    </>
                                )

                            })
                        }


                    </div>
                    <div ref={popup} className=" hidden  fixed  top-0 w-screen h-screen    ">
                        <div className=" flex  fixed  top-0 w-screen h-screen    ">
                            <div className="flex  absolute  w-screen z-0 h-screen opacity-50  bg-black " />
                            <AiFillCloseCircle onClick={showPopUp} className="text-5xl absolute top-3 right-3 bg-white rounded-full hover:text-white hover:bg-blue-900  cursor-pointer shadow-[0_0_10px_rgba(255,255,255,1)] text-blue-900" />
                            <div className="flex fdp w-4/5 h-4/5 p-10  bg-black overflow-hidden rounded-3xl">
                                <img src="/18981330_6057271.jpg" className="w-full  relative z-0" alt="" />

                                <div className="flex fdc absolute z-30 w-4/5 rounded-3xl  overflow-hidden  ">
                                    <div className="w-full h-4/5 bg-black absolute opacity-50  z-10" />

                                    <div className="card fd-column card-img  relative z-20 flex gap-4 w-2/3  p-8  h-full ">
                                        <div className="img flex overflow-hidden sm:w-[15rem] sm:h-[15rem] w-[15rem] h-[15rem] ">
                                            <img src={viewData.url} className="w-full " alt="" />
                                        </div>
                                        <h1 className="font-bold text-yellow-100 text-center pt-3 text-xl sm:text-xl lg:text-2xl">{viewData.name}</h1>
                                        <h1 className="font-bold text-yellow-100 text-center pt-3 text-xl sm:text-xl lg:text-2xl">{viewData.email}</h1>
                                        <h1 className="font-bold text-yellow-100 text-center pt-3 text-xl sm:text-xl lg:text-2xl">{viewData.category}</h1>
                                        <h1 className="font-bold text-yellow-100 text-center pt-3 text-xl sm:text-xl lg:text-2xl">{viewData.gender}</h1>
                                    </div>
                                    <div className="card card-about fd-column z-30 flex gap-4 p-6 h-full ">
                                        <h3 className=" text-xl card-about leading-9 w-full text-white font-semibold text-justify">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{viewData.about}</h3>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
                <footer className=" absolute p-2 flex bottom-0 h-max shadow-[0_0px_20px_rgba(100,100,100,1)]   bg-gradient-to-r from-purple-500 to-pink-500 w-full">
                    <h3 className="text-yellow-50 hover:text-red-300 float-left  font-bold justify-self-start lg:text-2xl ">&copy;&nbsp; Yash Soni</h3>
                    <div className="lg:w-4/5 w-1/2  ">
                        <AiOutlineInstagram className="justify-self-end font-extrabold sm:mr-2 mr-1 lg:mr-3 text-yellow-50 sm:text-xl text-4xl lg:text-4xl hover:text-red-300  cursor-pointer float-right" />
                        <AiOutlineGithub className="justify-self-end font-extrabold sm:mr-2 mr-1 lg:mr-3 text-yellow-50 sm:text-xl text-4xl lg:text-4xl hover:text-red-300  cursor-pointer float-right" />
                        <AiOutlineLinkedin className="justify-self-end font-extrabold sm:mr-2 mr-1 lg:mr-3 text-yellow-50 sm:text-xl text-4xl lg:text-4xl hover:text-red-300  cursor-pointer float-right" />
                    </div>
                </footer>

            </div>






            {/* <h1>{userDetail.username}</h1>
            <h1>{userDetail.email}</h1>
            <h1>{userDetail.password}</h1>
            <h1>{userDetail.confirmPassword}</h1>
            <h1>{userDetail.token}</h1> */}

        </>
    )
}

export default Main