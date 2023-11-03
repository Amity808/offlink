"use client";
import Image from "next/image";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import logo2 from "../../public/img/offlinkLogo.png";
import eth from "../../public/img/eth.png";
import UpdateProfile from "./components/modal/UpdateProfile";
import eyes from "../../public/img/eyes.svg";
import { updateProfile } from "./http/authentication";
import { useConnect, useAccount } from "wagmi";
import Listing from "./components/Listing";
import { InjectedConnector } from "wagmi/connectors/injected"
import Navbar from "./components/Navbar";
import { io } from "socket.io-client";
import AuthWrapper from "./http/AuthWraper";
import WebSocket from 'ws';


// const socket = io.connect("wss://alfajores-forno.celo-testnet.org/ws");

// socket.on('connect', () => {
//   // Socket is connected
//   console.log('Connected to the WebSocket server');
// });
export default function Home() {

  const router = useRouter();
  const token = localStorage.getItem("bih");
  const { address } = useAccount()

  const { connect } = useConnect({
    connector: new InjectedConnector()
  })

  
  
  const connectorWs = () => {
    const ws = new window.WebSocket('ws://16.16.185.83:80');
    // console.log(ws)
    ws.onopen = function() {
      console.log('WebSocket connection opened');
    };
  
    // ws.on('message', (message) => {
    //   console.log(JSON.parse(message));
    //   if (message.type == 'offerpoolUpdate'){
    //       console.log("New transaction listed ==> ", message.data)
    //   };
  
    //   if (message.type == 'offerpoolUpdate'){
    //       console.log("A transaction state has mutated ==> ", message.data)
    //   };
    // });
  };

  useEffect(() => {
    const loginToken = localStorage.getItem("bih");
    connect()
    if (!loginToken) {
      router.push("/login");
    }
    connectorWs()
    
  }, []);

 
  return (
    <AuthWrapper>
      <>
      <div className="flex justify-between items-center h-[10vh] font-bold space-x-2 w-30 px-16 ">
        <Navbar />
      </div>

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

          <div className="sec2 flex gap-3 w-[400px] lg:w-[400px] md:w-[300px] sm:w-[100px] items-center">
            <p className="text-xl text-[#0087FF]">17Eth </p>
            <Image src={eyes} alt="open" />
          </div>

          <div className="sec3 w-[90%] md:w-[50%] lg:w-[25%] ">
            <p>{address}</p>
          </div>
        </div>
        {/* start */}
        <div className=" flex flex-col">
        <Listing />
        </div>
      </div>
      
      </div>
    </>
    </AuthWrapper>
  );
}
