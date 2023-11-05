"use client";
import React, { useState } from "react";
import { FaApple } from "react-icons/fa";
import coinImg from "../../../public/img/coin.png";
import logo from "../../../public/img/offlinkLogo.png";
import Image from "next/image";
import "../components/css/signup.css";
import api from "../http/axiosfetch";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { sendEmailVerifcation } from "../http/authentication";
import Link from "next/link";
const Signup = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const isFormFilled = email && password;

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newRegister = { email: email, password: password };

    // send data to API route of login
    const res = api.post("/auth/register/", newRegister);
    try {
      const result = await res;

      console.log(result);
      const emailSend = { email: newRegister.email };
      await sendEmailVerifcation(emailSend);
      // return verify
      setEmail("");
      setPassword("");

      toast.success(result.data.message);
      router.push("/");
    } catch (error) {
      toast.error(error?.message);
      toast.error("User Already register or Network Error, Try again")
      console.log(`Error ${error}`);
    }
  };

  const canSave = [...Object.values(formData)].every(Boolean);

  return (
    <>
      <div class="main flex md:flex lg:flex	lg:w-full lg:min-h-screen md:min-h-screen md:w-full">
        <div class=" flex justify-center max-sm: h-full flex-col w-full md:w-[65%] lg:w-[65%] max-sm:mt-[50px]">
          <div class="flex items-center h-10 font-bold space-x-2 w-30 px-16">
            <Image
              src={logo}
              alt="offlink"
              className="logo-img"
              width={24}
              height={24}
            />
            <div class="off text-2xl text-black ">OFFLINK</div>
          </div>
          <form
            className=" md:w-[85%] lg:w-[50%] flex flex-col ml-auto	mr-auto my-auto w-[82%] sm:w-[90%] max-sm:mt-[65px]"
            onSubmit={handleSubmit}
          >
            {/* <!-- henry- --> */}
            <div>
              <div className="">
                <p className="wel h-[10%] lg:text-3xl md:text-4xl font-bold flex items-center">
                  Create an account 
                </p>
                <span className=" flex flex-row gap-2 text-base font-bold">
                <p>Already have an account </p>
                  <Link href="/login" className=" text-[#d96d00]">Login</Link>
                </span>
              </div>
            </div>
            <div className="he-mail flex flex-col gap-6 max-md:gap-4  cursor-pointer max-sm:gap-10">
              <div className="em font-medium ">EMAIL OR USERNAME</div>
              <input
                type="email"
                placeholder="offlink@gmail.com"
                name="email"
                for="pass"
                className="email1 w-full cursor-pointer bg-transparent border-b-2 border-black py-2 placeholder-rgba(0, 0, 0, 0.40)-500 p-3"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <div class="relative">
                <input
                  type="password"
                  for="password"
                  placeholder="Password"
                  name="password"
                  class="pass1 w-full cursor-pointer my-5 bg-transparent border-b-2 border-black py-2 placeholder-rgba(0, 0, 0, 0.40)-500 p-3"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>
            <div class="rem flex space-x-0  items-center justify-between font-medium ">
              <button className="for cursor-pointer">FORGOT PASSWORD</button>
            </div>
            <button
              className="login flex items-center justify-center font-medium  h-14 cursor-pointer" type="submit"
            >
              SIGN UP
            </button>
          </form>
        </div>

        <div className="relative flex justify-center items-center w-[35%] bg-[#0087ff] md:flex max-sm:hidden md:items-center lg:flex lg:items-center">
          <div className="main2-img absolute h-full md:h-[40%] lg:h-[60%] md:justify-self-center md:left-[0%] lg:left-[-30%] md:w-full">
            <Image
              src={coinImg}
              alt=""
              className="mid-img flex md:w-100%] md:justify-self-center h-full "
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Signup;
