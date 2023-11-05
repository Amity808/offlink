"use client";
import React, { useState, useEffect } from "react";
import { FaApple } from "react-icons/fa";
import "../components/login.css";
import api from "../http/axiosfetch";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import Image from "next/image";

import Link from "next/link";

const Login = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    const loginData = { email: email, password: password}

    try {
      const response = api.post("/auth/login", loginData)
      const result = await response;

      console.log(result.data.accessToken)
      localStorage.setItem("bih", result.data.accessToken)
      router.push("/")
      setEmail("")
      setPassword("")
    } catch (err) {
      console.log(`Error ${err.message}`)
      
    }
    

    
    
  }
  return (
    <>
      {/* <!--md:flex-col--> */}
      <div class="main flex flex-col md:flex md:flex-row lg:flex-row lg:flex min-h-screen	w-full">
        {/* <!--main1 start--> */}
        <div
          class="main1 md:w-[30%] lg:w-[40%] w-full 
         md:flex md:flex-row lg:flex-row md:items-center
         md:justify-center lg:items-center lg:justify-center lg:flex max-sm:hidden"
        >
          <div
            class="main11 lg:space-x-4 md:space-x-2 space-x-2
           w-full lg:flex lg:items-center lg:justify-center md:flex
            md:items-center md:justify-center "
          >
            {/* <img src="/img/Group1.png" alt="logo img" /> */}
            <h1 class="logo-txt md:text-3xl lg:text-4xl flex items-center">
              OFF LINK{" "}
            </h1>
          </div>
        </div>
        {/* <!--main1 ends--> */}

        <div class="main2 flex items-center justify-center lg:w-[60%] md:w-[70%] w-full max-sm:mx-auto">
          <div class="main2-txt md:w-[85%] lg:w-[50%]">
            <div>
              <div>
                <p class="wel h-[10%] lg:text-5xl md:text-4xl font-bold flex items-center lg:hidden md:hidden sm:block max-sm:mt-[30px]">
                  OFFLINK
                </p>
                <p class="wel h-[10%] lg:text-3xl md:text-2xl font-semibold flex items-center">
                  Login Your Account
                </p>
              </div>
            </div>

            <form action="" onSubmit={handleLogin}>
              <div class="he-mail w-full h-[25%]  cursor-pointer ">
                <label class="em font-medium ">EMAIL OR USERNAME</label>
                <input
                  type="email"
                  placeholder="offlink@gmail.com"
                  name="email"
                  for="pass"
                  class="email1 w-full cursor-pointer bg-transparent border-b-2 border-black py-2 placeholder-rgba(0, 0, 0, 0.40)-500"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <div class="relative">
                  <input
                    type="password"
                    for="email"
                    placeholder="Password"
                    name="pass"
                    class="pass1 w-full cursor-pointer my-5 bg-transparent border-b-2 border-black py-2 placeholder-rgba(0, 0, 0, 0.40)-500"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
              </div>

              <div class="rem flex space-x-0  items-center justify-between font-medium  h-[10%]">
                {/* <div class="for cursor-pointer">FORGOT PASSWORD</div> */}
              </div>
              <button class="flex w-full h-14 justify-center items-center font-medium cursor-pointer login">
                Login
              </button>
            </form>

            <div class="dont flex  w-full h-8 items-center font-medium">
              {" "}
              <div>Don&apos;t have an account</div> &nbsp;
              <div class="res cursor-pointer my-2">
                <Link href="/signup">SignUp</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
