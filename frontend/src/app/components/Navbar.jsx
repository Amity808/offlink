"use client";
import React, { useState } from "react";
import Image from "next/image";
import logo2 from "../../../public/img/offlinkLogo.png";
import Link from "next/link";
import { FaBars, FaTimes } from "react-icons/fa";
import { identiconTemplate } from "./helper";
const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <header className="pt-4 container mx-auto px-8 ">
      <nav className=" flex justify-between items-center">
        <Link href="/">
          <div className=" cursor-pointer flex flex-row justify-center items-center gap-2">
            <Image alt="logo" src={logo2} className=" h-[24] w-[24]" />
            <p className=" text-2xl font-bold">OFFLINK</p>
          </div>
        </Link>
        <div className="hidden sm:flex cursor-pointer gap-3 mt-[30px]">
          <h3 className="text-black text-lg leading-none font-medium">
            <Link href="/">Home</Link>
          </h3>
          <h3 className="text-black text-lg leading-none font-medium">
            <Link href="/order">Order</Link>
          </h3>
          <h3 className="text-black text-lg leading-none font-medium">
            <Link href="/profile">My Profile</Link>
          </h3>
        </div>

        <div className="md:hidden  mt-3">
          <button className="text-dark" onClick={toggleMenu}>
            {isOpen ? (
              <FaTimes className="text-2xl" />
            ) : (
              <FaBars className="text-2xl" />
            )}
          </button>
        </div>
      </nav>

      {isOpen && (
        <div
          className="fixed z-20 top-0 bg-[#0087FF] 
         right-0 bottom-0 left-0 flex flex-col 
         items-center gap-6 justify-center"
        >
          <button
            className="text-white absolute top-4 right-4"
            onClick={toggleMenu}
          >
            <FaTimes className="text-2xl" />
          </button>

          <h3 className="text-white text-sm font-normal leading-none">
            <Link href="/">Home</Link>
          </h3>
          <h3 className="text-white text-sm font-normal leading-none">
            <Link href="/order">My Order</Link>
          </h3>
          <h3 className="text-white text-sm font-normal leading-none">
            <Link href="/profile">Profile</Link>
          </h3>
        </div>
      )}
    </header>
  );
};

export default Navbar;
