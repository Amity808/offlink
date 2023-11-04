"use client";
import Image from "next/image";
import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import logo2 from "../../public/img/offlinkLogo.png";
import eth from "../../public/img/eth.png";
import UpdateProfile from "./components/modal/UpdateProfile";
import eyes from "../../public/img/eyes.svg";
import {  useAccount, useBalance } from "wagmi";
import Listing from "./components/Listing";
import Navbar from "./components/Navbar";
import { io } from "socket.io-client";
import AuthWrapper from "./http/AuthWraper";
import { truuncateAddress } from "./components/helper/truncateAddress";
import ERC20 from "../app/contract/erc20InstacnceAbi.json"

import Orders from "./components/Orders";

export default function Home() {
  const [displayBalance, setDisplayBalance] = useState(false)
  const router = useRouter();
  const { address, isConnected } = useAccount()
  const { data: cUSDBalance } = useBalance({
    address,
    token: ERC20.address
  })
  
  useEffect(() => {
    if (isConnected && cUSDBalance) {
      setDisplayBalance(true);
      return;
    }
    setDisplayBalance(false);
  }, [cUSDBalance, isConnected]);
  

  
  return (
    <AuthWrapper>
      <>
      {/* <div className="flex justify-between items-center h-[10vh] font-bold space-x-2 w-30 px-16 "> */}
        <Navbar />
      {/* </div> */}

      <div className=" flex flex-row justify-center gap-4 max-sm:flex-col">
      <div className=" max-sm:ml-[20px]">
        <div
          className=" max-sm:mr-4  flex flex-col gap-4 justify-around"
        >
          <div class=" justify-center flex gap-3 bg-[#E8E8E8] w-[200px] max   items-center rounded-md">
            <Image src={eth} alt="eth" className="" />
            <div className="text-xl   ">Celo cUSD</div>
            {/* <Image src={arrowdown} alt="arrowdown" /> */}
          </div>

          <div className="sec2 flex gap-3 items-center">
          Balance: {Number(cUSDBalance?.formatted || 0).toFixed(2)} cUSD
            {/* <Image src={eyes} alt="open" /> */}
          </div>

          <div className="sec3 w-[90%] md:w-[50%] lg:w-[25%] ">
            <p>{truuncateAddress(address)}</p>
          </div>
        </div>
        {/* start */}
        <div className=" flex flex-col">
        {/* <Listing /> */}
        </div>
        <Orders />
      </div>
      
      </div>
    </>
    </AuthWrapper>
  );
}
