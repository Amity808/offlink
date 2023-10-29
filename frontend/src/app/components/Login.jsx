"use client";
import React, { useState } from "react";
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
         md:justify-center lg:items-center lg:justify-center lg:flex"
        >
          <div
            class="main11 lg:space-x-4 md:space-x-2 space-x-2
           w-full lg:flex lg:items-center lg:justify-center md:flex
            md:items-center md:justify-center"
          >
            <img src="/img/Group1.png" alt="logo img" />
            <h1 class="logo-txt md:text-3xl lg:text-4xl flex items-center">
              OFF LINK{" "}
            </h1>
          </div>
        </div>
        {/* <!--main1 ends--> */}

        <div class="main2 flex items-center justify-center lg:w-[60%] md:w-[70%] w-full mt-auto mb-auto lg:h-full md:h-full">
          <div class="main2-txt md:w-[85%] lg:w-[50%]">
            <div>
              <div>
                <p class="wel h-[10%] lg:text-3xl md:text-4xl font-bold flex items-center">
                  Login Your Account
                </p>
              </div>
              <div class=" h-[10%] w-full font-medium ">
                Start with our 30 day free trial.
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
                <div class="flex items-center  space-x-3">
                  <input
                    type="checkbox"
                    class="checkb w-6 h-6 cursor-pointer"
                  />
                  <div>Remember me</div>
                </div>
                <div class="for cursor-pointer">FORGOT PASSWORD</div>
              </div>
              <button class="login flex items-center justify-center font-medium  h-14 cursor-pointer w-[460px] max-md:w-[350px] max-sm:w-[200px]">
                SIGN UP
              </button>
            </form>
            <div class="google flex w-full h-14 justify-center items-center font-medium cursor-pointer">
              <button>
              SIGN IN WITH GOOGLE
              </button>
            </div>

            <div class="apple flex w-full h-14 justify-center items-center font-medium cursor-pointer">
              <div class="flex justify-between items-center  gap-4">
                <div>
                  <FaApple width={24} height={24} className="" />
                </div>
                <div class="ap cursor-pointer">SIGN IN WITH APPLE</div>
              </div>
            </div>

            <div class="dont flex  w-full h-8 items-center font-medium">
              {" "}
              <div>Don't have an account</div> &nbsp;
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
