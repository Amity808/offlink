"use client";
import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Image from "next/image";
import Link from "next/link";
import newSVg from "../UI/new.svg"
import { truuncateAddress } from "../components/helper/truncateAddress";
import { toast } from "react-toastify";
import { useDebounce } from "use-debounce";
import { useAccount } from "wagmi";
import { userOrder } from "../http/offlickdata";
import { nairapricefeed } from "../http/offlickdata";
import { useContractSendWrite } from "../hooks/useContractWrite";
import AuthWrapper from "../http/AuthWraper";
import { useContractCall } from "../hooks/useContractRead";
import { useContractTrans } from "../hooks/useContractTrans";
import UserOrders from "./components/UserOrders";
import { parseEther } from "ethers/lib/utils";
import { useConnectModal } from "@rainbow-me/rainbowkit";
import { identiconTemplate } from "../components/helper";


const PlaceOrder = () => {
  const { address } = useAccount()
  const [nairaRate, setNairaRate] = useState()
  const [depositAmount, setDepositAmount] = useState(0);
  // const [cryptocurrency, setCryptocurrency] = useState("");
  const [fiatCurrency, setFiatCurrency] = useState("");
  const [signature, setSignature] = useState("")
  const [blockData, setblockData] = useState()
  const [loading, setLoading] = useState("")
  const [conversionRate, setConversionRate] = useState(0)
  const tokenAddress = '0x874069fa1eb16d44d622f2e0ca25eea172369bc1'

  const { openConnectModal } = useConnectModal()

useEffect(() => {
    const curencData = async () => {
        try {
        const res = await nairapricefeed()
        const result = res?.data.usd.ngn
        setNairaRate(result)
        console.log(result)
        } catch (err) {
          console.log(err)
        }
      }
    curencData();
  }, [])

  const coinValue = nairaRate * depositAmount
  
  const { data } = useContractCall("_ordersCount", [], true)
  const orderlen = Number(data?.toString()) 
  console.log(orderlen)
  console.log(`Naira ${coinValue}`)
  const orderData = { 
    nonce: orderlen,
    token_amount: depositAmount, 
    cryptocurrency: tokenAddress,
    fiat_currency: fiatCurrency,
    fiat_amount: coinValue
  }
  let token;

  if(typeof window !== "undefined") {
    token = localStorage.getItem('bih')

  }

  
  const handleOrder = async (e) => {
    e.preventDefault();
    try {
      const placeUserOrder = await userOrder(orderData, token)
      const res = await placeUserOrder.data.signedTransaction;
      console.log(placeUserOrder)
      console.log(res);
      setblockData(res)
      if(placeUserOrder) {
        toast.success("Order Successfully placed. Waiting for Trader")
      }
      
    } catch (err) {
      console.log(err)
    }
  }

  const [ deBounceNonce ] = useDebounce(blockData?.[0], 500) 
  const [ deBounceTokenAmount ] = useDebounce(blockData?.[1], 500) 
  const [ deBounceCurrencyAmount ] = useDebounce(blockData?.[2], 500) 
  // currency type eg Naira
  const [ deBounceCurrenyByte ] = useDebounce(blockData?.[3], 500) 
  const [ deBounceCurrencyTokenAdd ] = useDebounce(blockData?.[4], 500) 
  const [ deBounceSignature ] = useDebounce(blockData?.[5], 500) 

  console.log("Block",blockData?.[1])

  // convert the token to ethers
  const convertToken = parseEther(
    depositAmount.toString() || "1"
  )
  console.log("Token",convertToken);
  console.log("debounc",deBounceTokenAmount);
  
  const { writeAsync: approve } = useContractTrans(depositAmount.toString() || "1")

  const { writeAsync: placeNewOrder} = useContractSendWrite("placeSellOrder", [
    deBounceNonce,
    depositAmount,
    deBounceCurrencyAmount,
    deBounceCurrenyByte,
    deBounceCurrencyTokenAdd,
    deBounceSignature
  ])

  const handlePlaceOrder = async () => {

    
    if(!approve) {
      throw ("Failed to place order")
    }
    const approveTx = await approve()

    await approveTx
    if(!placeNewOrder) throw new "Failed to confirm order"
    setLoading("Placing Order");

    const transactTx = await placeNewOrder();
    setLoading("Waiting for confirmation")
    await transactTx
  }

  const transferToken = async () => {
    setLoading("Approving ....")
    try {
      if(!address && openConnectModal) {
        openConnectModal();
        return;
      }

      await toast.promise(handlePlaceOrder(), {
        pending: "Awaiting transaction",
        success: "Seccessful payment",
        error: "Error with payment"
      })
    } catch (err) {
      console.log( err?.message )
      toast.error(err?.message)
    }
  }
  

  return (
   <AuthWrapper>
     <div>
      <Navbar />
      <div className=" flex flex-col justify-center items-center my-auto">
        {/* <Image src={ladyjpeg} className=" w-[100px] h-[100px] rounded-full" /> */}
        {identiconTemplate(address, 15)}
        <span className=" mt-[30px]">
          <p>{truuncateAddress(address)}</p>
        </span>

        {!blockData? (<div>
          <form className=" mt-[100px]" onSubmit={handleOrder}>
          <div className=" flex flex-col gap-2 justify-center">
            <span className="flex flex-col">
              <label
                htmlFor=""
                className=" font-semibold text-[18px] mb-[10px]"
              >
                Convert your stable coin  to fiat  {coinValue}
              </label>
              <input
                type="number"
                onChange={(e) => setDepositAmount(e.target.value)}
                placeholder="Enter Amount"
                className=" w-[360px] h-[40px] border-2 border-black p-2 rounded-lg"
              />
            </span>
            
            <span className=" flex flex-col">
              <label
                htmlFor=""
                className=" font-semibold text-[18px] mb-[10px] rounded-lg "
              >
                Currency
              </label>
              <input
                type="text"
                onChange={(e) => setFiatCurrency(e.target.value)}
                placeholder="E.g NIG"
                className=" w-[360px] h-[40px] border-2 border-black p-2 rounded-lg "
              />
            </span>
          </div>
          <button className=" w-[360px] h-[60px] bg-[#0087FF] rounded-lg mt-[40px] text-lg font-semibold text-white">
            Convert
          </button>
        </form>
        </div>): <div className=" flex justify-center items-center flex-col">
          <span className="">
            <Image src={newSVg} alt="new" className=" w-[200px] h-[200px] mt-[40px]" />
          </span>

          <button className=" w-[360px] h-[60px] bg-[#0087FF] rounded-lg mt-[40px] text-lg font-semibold text-white" onClick={transferToken}>
            Make Payment
          </button>
          </div>}
        
          <p>Order Transaction</p>
        {/* <button className=" w-[360px] h-[60px] bg-[#0087FF] rounded-lg mt-[40px] text-lg font-semibold" onClick={approve} disabled={!blockData}>
            FUnd
          </button> */}
          
          
          {/* <Spin /> */}
          <UserOrders />
      </div>
    </div>
   </AuthWrapper>
  );
};

export default PlaceOrder;
