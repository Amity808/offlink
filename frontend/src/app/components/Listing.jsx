'use client'
import React, { useState } from 'react'
import ladyjpng from "../../../public/img/lady.jpeg";
import Image from 'next/image';
import flag from "../../../public/img/flag.svg";
import { toast } from 'react-toastify';
import { useDebounce } from "use-debounce"

const Listing = () => {

  return (
    <div className=''>
        <div className=' mb-[29px]'>
            <button className=' text-[17.872px] font-medium border-b-4 border-orange-600'>listings</button>
        </div>
        <div className=' w-[402px] h-[250px] bg-[#D9D9D9] rounded-lg flex flex-col'>
            <div className=' flex justify-between px-4 items-center mt-[32px]'>
            <Image src={ladyjpng} width={24} height={24} className=' rounded-full w-[60px] h-[60px]' />
            <button className=' rounded-lg w-[100px] h-[44px] border-black border'>Accept</button>
            {/* <button className=' rounded-lg w-[100px] h-[44px] border-black border'>Release Fund</button> */}
            </div>
            <span className=' mb-[12px] mt-[22px] ml-[25px] text-lg font-semibold'>
                <p>Address</p>
            </span>
            <div className=' flex ml-[28px] gap-4'>
                <p>wants to swap 7.0 BTC for </p>
                <span className=' flex flex-row gap-2'>
                    <p>NIG</p>
                    <Image src={flag} width={24} height={24} className='' />
                </span>
            </div>
            <div className=' ml-[28px] text-base font-medium  mt-2'>
                <p>Bank Name:</p>
                <p>Bank Address: </p>
            </div>
        </div>
    </div>
  )
}

export default Listing