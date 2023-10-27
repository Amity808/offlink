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
const Signup = () => {
  const router = useRouter()
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newRegister = { email: email, password: password };

    // send data to API route of login
    try {
      const res = api.post("/auth/register/", newRegister);
      const result = await res;

      console.log(result);
      setEmail("")
      setPassword("")
      toast.success(
        result.data.message
      )
      router.push("/")
      const sendVerification = api.post("/auth/send-password-resetlink/", newRegister.email)
      const isSent = await sendVerification;
      console.log(isSent)
    } catch (error) {
      console.log(`Error ${error.message}`)
    }
  };

  

  const canSave = [...Object.values(formData)].every(Boolean);

  return (
    <>
      <div class="main flex md:flex lg:flex	lg:w-full lg:min-h-screen md:min-h-screen md:w-full">
        <div class="main1 flex  justify-center h-full flex-col w-full md:w-[65%] lg:w-[65%]">
          <div class="flex items-center h-10 font-bold space-x-2 w-30 px-16">
            <Image
              src={logo}
              alt="offlink"
              class="logo-img "
              width={24}
              height={24}
            />
            <div class="off text-2xl text-black">OFFLINK</div>
          </div>
          <form
            class="main2-txt md:w-[85%] lg:w-[50%] flex flex-col ml-auto	mr-auto mt-auto mb-auto lg:h-[80%] w-[82%]"
            onSubmit={handleSubmit}
          >
            {/* <!-- henry- --> */}
            <div>
              <div>
                <p class="wel h-[10%] lg:text-3xl md:text-4xl font-bold flex items-center">
                  Create an account
                </p>
              </div>
              <div class=" h-[10%] w-full font-medium ">
                Start with our 30 day free trial.
              </div>
            </div>
            {/* form */}
            {/* <form action="" method="" onSubmit={handleSubmit}> */}
            <div class="he-mail w-full h-[25%]  cursor-pointer ">
              <div class="em font-medium ">EMAIL OR USERNAME</div>
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
                  for="password"
                  placeholder="Password"
                  name="password"
                  class="pass1 w-full cursor-pointer my-5 bg-transparent border-b-2 border-black py-2 placeholder-rgba(0, 0, 0, 0.40)-500"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>
            <div class="rem flex space-x-0  items-center justify-between font-medium  h-[10%]">
              <div class="flex items-center  space-x-3">
                <input type="checkbox" class="checkb w-6 h-6 cursor-pointer" />
                <div>Remember me</div>
              </div>
              <div class="for cursor-pointer">FORGOT PASSWORD</div>
            </div>
            <button class="login flex items-center justify-center font-medium  h-14 cursor-pointer">
              SIGN UP
            </button>
            {/* </form> */}
            {/* <!-- <div class='flex w-full h-14 justify-center items-center font-medium'>OR</div> --> */}
            <div class="google flex w-full h-14 justify-center items-center font-medium cursor-pointer">
              <div class="flex justify-between items-center space-x-4">
                {/* <!-- <div><ion-icon name="logo-google" class="google"></ion-icon></div> --> */}
                <div>SIGN UP WITH GOOGLE</div>
              </div>
            </div>

            <div class="apple flex w-full h-14 justify-center items-center font-medium cursor-pointer">
              <div class="flex justify-between items-center  space-x-4">
                <div>
                  <FaApple width={24} height={24} className="" />
                </div>
                <div class="ap cursor-pointer">SIGN UP WITH APPLE</div>
              </div>
            </div>

            <div class="dont flex  w-full h-8 items-center font-medium">
              {" "}
              <div>Don't have an account</div> &nbsp;
              <div class="res cursor-pointer my-2">
                <a href="register.html">LOGIN</a>
              </div>
            </div>
          </form>
        </div>

        <div class="main2 relative justify-center  md:flex md:items-center lg:flex lg:items-center">
          <div class="main2-img absolute h-full md:h-[40%] lg:h-[60%] md:justify-self-center md:left-[0%] lg:left-[-30%] md:w-full">
            <Image
              src={coinImg}
              alt=""
              class="mid-img flex md:w-100%] md:justify-self-center h-full "
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Signup;
