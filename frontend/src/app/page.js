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
        <Navbar />
      <div className=" flex flex-row justify-center gap-4 max-sm:flex-col">
      <div className=" max-sm:ml-[20px]">
        <div
          className=" max-sm:mr-4  flex flex-col gap-4 justify-around"
        >
          <div className=" flex gap-3 justify-center bg-[#E8E8E8] w-[250px]   items-center rounded-md py-3">
            <Image src={eth} alt="eth" className="" />
            <div className="text-xl pr-1">{truuncateAddress(address)}</div>
          </div>

          <div className="sec2 flex gap-3 items-center">
          Balance: {Number(cUSDBalance?.formatted || 0).toFixed(2)} cUSD
            {/* <Image src={eyes} alt="open" /> */}
          </div>
        </div>
        <div className=" flex flex-col">
        </div>
        <Orders />
      </div>
      
      </div>
    </>
    </AuthWrapper>
  );
}
