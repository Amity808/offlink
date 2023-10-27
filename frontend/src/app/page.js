"use client";
import Image from "next/image";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import logo2 from "../../public/img/offlinkLogo.png";
import eth from "../../public/img/eth.png";
import { FiChevronDown } from "react-icons/fi";
import arrowdown from "../../public/img/arrowdown.svg";
import eyes from "../../public/img/eyes.svg";
import ladyImg from "../../public/img/lady.jpeg";
import flag from "../../public/img/flag.svg";
import { ConnectButton } from "@rainbow-me/rainbowkit";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("bih");
    // const isLoggedIn = isAuthenticated(token as string);
    if (!token) {
      router.push("/login");
      // localStorage.removeItem('zpt');
    }
  }, []);

  return (
    <>
      <div className="flex justify-between items-center h-[10vh] font-bold space-x-2 w-30 px-16">
        <div className=" flex flex-row gap-2 justify-center">
          <Image
            src={logo2}
            alt="offlink"
            width={24}
            height={24}
            class="logo-img h-6 w-6"
          />
          <div className="off text-2xl text-black">OFFLINK</div>
        </div>
        <div>
          <ConnectButton />
        </div>
      </div>

      <div className="main w-full h-[90vh]">
        <div
          className="section1 mr-auto ml-auto h-[25%] lg:h-[35%]
         md:h-[30%] w-[70%] lg:w-[50%] md:w-[50%]  flex flex-col justify-around"
        >
          <div class="sec1 flex md:flex lg:flex bg-[#E8E8E8] w-[90%] md:w-[50%] lg:w-[25%] items-center rounded-md justify-between">
            <Image src={eth} alt="eth" className="" />
            <div className="text-xl   ">Ethereum</div>
            <Image src={arrowdown} alt="arrowdown" />
          </div>

          <div className="sec2 flex justify-between w-[90%] lg:w-[25%] md:w-[50%] items-center">
            <p className="text-xl text-[#0087FF]">17Eth </p>
            <Image src={eyes} alt="open" />
          </div>

          <div className="sec3 w-[90%] md:w-[50%] lg:w-[25%] ">
            <p>1253535353535335</p>
          </div>

          <div
            className="sec4 flex bg-[#B0D9FD] justify-between w-[90%] lg:w-[50%] 
    md:w-[60%] lg:h-[25%] md:h-[24%] h-[20%] items-center text-white rounded-md	"
          >
            <div
              className="btn1 bg-[#0087FF] rounded-md w-[20%] h-[70%] 
        flex items-center justify-center  "
            >
              Buy
            </div>
            <div
              className="btn2 btn1 bg-[#0087FF] rounded-md w-[20%] h-[70%]
        flex items-center justify-center "
            >
              Sell
            </div>
          </div>
        </div>

        <div
          className="sec5 flex w-[100%] lg:w-[50%] md:w-[60%] 
 mr-auto ml-auto justify-between items-center h-[5%] mt-2"
        >
          <div className="border-b-2 border-orange-500 pb-1">listings</div>
          <div>activities</div>
        </div>

        <div className="sec6  w-100%] lg:w-[50%] md:w-[60%] mr-auto ml-auto flex flex-col mt-[2rem]">
          <div className="cont1  flex h-[3rem] w-full items-end justify-between border-b-2 pb-1 border-black-500">
            <div className="flex items-center space-x-4 pt-0.5 ">
              <div className="pics self-center">
                <Image
                  src={ladyImg}
                  alt=""
                  className="w-[2rem] h-[2rem] rounded-full"
                />
              </div>

              <div className="flex flex-col">
                <div>henry</div>
                <div className="flex items-center space-x-2">
                  <div className="">wants to swap</div>
                  <div className="">7.0</div>
                  <div className="text-blue-500">BTC</div>
                  <div className="">for</div>
                  <div className="">Ngn</div>
                  <div className="">
                    <Image src={flag} alt="country" />
                  </div>
                </div>
              </div>
            </div>
            <p className="time pt-0.5 ">11:40am</p>

            {/* <!-- <div class="time pt-0.5 bg-red-500">
                <input type="time" id="read_only" value="13:45" readonly>
            </div> --> */}
          </div>
          {/* start */}
        </div>
      </div>
    </>
  );
}
