'use client'
import React from 'react'
import Listing from '@/app/components/Listing'
import { useRouter } from 'next/navigation'
const OrderDetails = ({ orderlen }) => {
    const router = useRouter()
    
  return (
    <div>
        {/* <Listing id={orderlen} /> */}
    </div>
  )
}

export default OrderDetails