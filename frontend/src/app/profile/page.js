'use client'
import React, { useState } from "react";
import { useEffect } from "react";
import Navbar from "../components/Navbar";
import UpdateProfile from "../components/modal/UpdateProfile";
import AuthWrapper from "../http/AuthWraper";
import { getProfile } from "../http/authentication";
const UpdateProfiles = () => {
  // const token = localStorage.getItem('bih')
  const [datafetch, setDatafetch] = useState()
  
  const fetchUserData = async () => {
    const data = await getProfile();
    
    const res = await data.data
    console.log(res)
    setDatafetch(res)

  }
  useEffect (() => {
  fetchUserData()
  },[])
  console.log(datafetch)
  return (
    <>
    <AuthWrapper>

      <Navbar />
      <div className=" flex flex-col gap-3 my-[30px]">
        <>
          <UpdateProfile />
        </>
        {!datafetch?.firstname == "" ? <>
          <div className=" max-sm:ml-[20px] flex justify-center flex-col items-center mx-auto border-black border-4 rounded-3xl gap-7 w-[600px] max-sm:w-[350px]">
          <span className=" flex flex-row gap-3 mt-[20px]">
            <p>FirstName:</p>
            <p>{datafetch?.firstname}</p>
          </span>
          <span className=" flex flex-row gap-3">
            <p>Surname: </p>
            <p>{datafetch?.surname}</p>
          </span>
          <span className=" flex flex-row gap-3">
            <p>Phone No: </p>
            <p>{datafetch?.phone}</p>
          </span>
          <span className=" flex flex-row gap-3">
            <p>Account no: </p>
            <p>{datafetch?.bankAccount}</p>
          </span>
          <span className=" flex flex-row gap-3 mb-5">
            <p>Bank Name: </p>
            <p>{datafetch?.bankName}</p>
          </span>
        </div>
        </> : <p className=" text-base text-center">Please Update your Profile</p>}
        
      </div>
    </AuthWrapper>
    </>
  );
};

export default UpdateProfiles;
