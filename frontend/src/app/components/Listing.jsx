'use client'
import React, { useState, useCallback, useEffect } from 'react'
import Image from 'next/image';
import flag from "../../../public/img/flag.svg";
import { identiconTemplate } from './helper';
import { ethers } from 'ethers';
import { useContractCall } from '../hooks/useContractRead';;
import { useContractSendWrite } from '../hooks/useContractWrite';
import { useAccount } from 'wagmi';
import { useConnectModal } from '@rainbow-me/rainbowkit';
import { toast } from 'react-toastify';

const Listing = ({ id }) => {

const { address } = useAccount()
const { openConnectModal } = useConnectModal()

const { data: _orders} = useContractCall("_orders", [id], true)

const { writeAsync: acceptOrder } = useContractSendWrite("acceptOrder", [Number(id)])

const handleAccept = async () => {
    if(!acceptOrder) throw "Failed to accept order"
    const takeOrder = await acceptOrder()
    await takeOrder;
}

const acceptOrderQuece = async () => {
    try {
        if(!address && openConnectModal){
            openConnectModal();
            return;
        }
        await toast.promise(handleAccept(), {
            pending: "Procesing Trade",
            success: "Trader successfully accepted",
            error: "Kindly get a buyer role, or contant the customer care"
        })

    } catch (err) {
        console.log( err?.message)
        toast.error(err?.message)
    }
}
  const [orderItem, setOrderItem] = useState(null);

  
//  txStatus 0
//  nonce 0
//  seller 0x9dBa18e9b96b905919cC828C399d313EfD55D800
//  buyer 0x0000000000000000000000000000000000000000
//  token 0x874069Fa1Eb16D44d622F2e0Ca25eeA172369bC1
//  currency 0x4e474e0000000000000000000000000000000000000000000000000000000000
//  amountInToken 1
//  amountInCurrency 3500

  const getOrdersItem = useCallback(() => {
    if(!_orders) return null;
    setOrderItem({
      txStatus: _orders[0],
      nonce: Number(_orders[1]),
      seller: _orders[2],
      buyer: _orders[3],
      token: _orders[4],
      currency: _orders[5],
      amountInToken: Number(_orders[6]),
      amountInCurrency: Number(_orders[7])


    })
  }, [_orders])

  useEffect(() => {
    getOrdersItem()
  }, [getOrdersItem])

  if(!orderItem) return null;

  const amountTOken = ethers.utils.formatEther(
    orderItem?.amountInToken.toString(),
  )

//   accept order 


  return (
    <div className=''>
        
        <div className=' w-[402px] h-[270px] bg-[#D9D9D9] rounded-lg flex flex-col'>
            <div className=' flex justify-between px-4 items-center mt-[32px]'>
            {/* <Image src={ladyjpng} width={24} height={24} className=' rounded-full w-[60px] h-[60px]' /> */}
            {identiconTemplate(orderItem.seller, 12)}
            <button className=' rounded-lg w-[100px] h-[44px] border-black border' onClick={acceptOrderQuece}>Accept</button>
            {/* <button className=' rounded-lg w-[100px] h-[44px] border-black border'>Release Fund</button> */}
            </div>
            <span className=' mb-[12px] mt-[22px] ml-[25px] text-lg font-semibold'>
                <p>Address</p>
            </span>
            <div className=' flex ml-[28px] gap-4'>
                <p>wants to swap {amountTOken} cUSD for {orderItem.amountInCurrency}</p>
                <span className=' flex flex-row gap-2 mr-5 justify-center items-start'>
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