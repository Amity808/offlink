import React from 'react'
import Image from 'next/image';
import logo2 from "../../../public/img/offlinkLogo.png";
const Navbar = () => {
  return (
    <>
      <div className="flex justify-between items-center h-[10vh] font-bold space-x-2 w-30 px-16">
        <div className=" flex flex-row gap-2 justify-center">
          <Image
            src={logo2}
            alt="offlink"
            width={24}
            height={24}
            class="logo-img h-6 w-6"
          />
          <div className="off text-2xl text-black">OFFLINK</div>
        </div>
        
      </div>
    </>
  )
}

export default Navbar