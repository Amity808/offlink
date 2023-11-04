'use client'
import React from 'react'
import { useContractCall } from '../hooks/useContractRead'
import Listing from './Listing'
const Orders = () => {

    const { data } = useContractCall("_ordersCount", [], true)
    

    const orderLenght = data ? Number(data.toString()) : 0;

    const getOrderLenght = () => {
        if(!orderLenght) return null;
        const orderplaced = [];
        for (let i = 0; i < orderLenght; i++) {
            orderplaced.push(<Listing key={i} id={i} />)
        }

        return orderplaced;
    }
  return (
    <div>
        <div className=' mb-[29px]'>
            <button className=' text-[17.872px] font-medium border-b-4 border-orange-600'>listings</button>
        </div>
        <div className=" mx-auto max-w-4xl py-5 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
        <div className="grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-3 xl:gap-x-8">
          {getOrderLenght()}
        </div>
      </div>
    </div>
  )
}

export default Orders