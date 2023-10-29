'use client'
import React, { useState } from 'react'
import Navbar from '../components/Navbar'
import Image from 'next/image'
import ladyjpeg from "../../../public/img/lady.jpeg"
const PlaceOrder = () => {
    const [depositAmount, setDepositAmount] = useState(0)
  return (
    <div>
      <Navbar />
      <div className=' flex flex-col justify-center items-center'>
        <Image src={ladyjpeg} className=' w-[100px] h-[100px] rounded-full' />
        <span className=' mt-[30px]'>
            <p>Address</p>
        </span>
        <form action="" className=' mt-[100px]'>
            <div className=' flex flex-col'>
                <label htmlFor="" className=' font-semibold text-[18px] mb-[10px]'>Convert your coin to fiat</label>
                <input type="number" placeholder='Enter Amount' className=' w-[360px] h-[40px] border-2 border-black' />
            </div>
            <button className=' w-[360px] h-[60px] bg-[#0087FF] rounded-lg mt-[40px] text-lg font-semibold'>Convert</button>
        </form>
      </div>
    </div>
  )
}

export default PlaceOrder
