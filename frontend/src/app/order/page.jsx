"use client";
import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Image from "next/image";
import ladyjpeg from "../../../public/img/lady.jpeg";
import { toast } from "react-toastify";
import { useDebounce } from "use-debounce";
import { useAccount } from "wagmi";
import { userOrder } from "../http/offlickdata";
import { nairapricefeed } from "../http/offlickdata";
import api from "../http/axiosfetch"
const PlaceOrder = () => {
  const { address } = useAccount()
  const [nairaRate, setNairaRate] = useState()
  const [depositAmount, setDepositAmount] = useState(0);
  // const [cryptocurrency, setCryptocurrency] = useState("");
  const [fiatCurrency, setFiatCurrency] = useState("");
  const [conversionRate, setConversionRate] = useState(0)
  // const tokenAddress = '0x874069fa1eb16d44d622f2e0ca25eea172369bc1'
//   {
//     "token_amount": 5,
//     "cryptocurrency": "0x874069fa1eb16d44d622f2e0ca25eea172369bc1",
//     "fiat_currency": "NGN",
//     "fiat_amount":6000
// }

  



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
  
  console.log(`Naira ${coinValue}`)
  const orderData = { token_amount: depositAmount, 
    cryptocurrency: address,
    fiat_currency: fiatCurrency,
    fiat_amount: coinValue
  }

  const token = localStorage.getItem('bih')
  
  const handleOrder = async (e) => {
    e.preventDefault();
    try {
      const placeUserOrder = await userOrder(orderData, token)
      // const res = placeUserOrder;
      console.log(placeUserOrder)
      if(placeUserOrder) {
        toast.success("Order Successfully placed. Waiting for Trader")
      }
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <div>
      <Navbar />
      <div className=" flex flex-col justify-center items-center">
        <Image src={ladyjpeg} className=" w-[100px] h-[100px] rounded-full" />
        <span className=" mt-[30px]">
          <p>Address</p>
        </span>
        <form action="" className=" mt-[100px]" onSubmit={handleOrder}>
          <div className=" flex flex-col gap-2">
            <span className="flex flex-col">
              <label
                htmlFor=""
                className=" font-semibold text-[18px] mb-[10px]"
              >
                Convert your coin to fiat
              </label>
              <input
                type="number"
                onChange={(e) => setDepositAmount(e.target.value)}
                placeholder="Enter Amount"
                className=" w-[360px] h-[40px] border-2 border-black p-2"
              />
            </span>
            
            <span className=" flex flex-col">
              <label
                htmlFor=""
                className=" font-semibold text-[18px] mb-[10px]"
              >
                Crypto Currency
              </label>
              <input
                type="text"
                onChange={(e) => setFiatCurrency(e.target.value)}
                placeholder="E.g NIG"
                className=" w-[360px] h-[40px] border-2 border-black p-2"
              />
            </span>
          </div>
          <button className=" w-[360px] h-[60px] bg-[#0087FF] rounded-lg mt-[40px] text-lg font-semibold">
            Convert
          </button>
        </form>
      </div>
    </div>
  );
};

export default PlaceOrder;
