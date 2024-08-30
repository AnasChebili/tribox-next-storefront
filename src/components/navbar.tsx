"use client";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
export default function Navbar() {
  return (
    <div className="sticky">
      <div className=" hidden  navbar lg:flex justify-between mx-20 mt-8 ">
        <Link href="/">
          <Image src="/logo.svg" alt="" width={70} height={45}></Image>
        </Link>

        <div className="navllinks flex justify-between w-[800px] items-center">
          <Image
            src="/search-icon.svg"
            alt=""
            width={32}
            height={32}
            className="cursor-pointer"
          ></Image>
          <Link href="/store">Store</Link>
          <Link href="/">Destroy My Design</Link>
          <Link href="/product-listing">Categories</Link>
          <Link href="/about">About</Link>
          <Image
            src="/love.svg"
            alt=""
            width={50}
            height={50}
            className="cursor-pointer"
          ></Image>
          <div className="Cart flex">
            <div className="h-[50px] w-[70px] bg-black rounded-3xl leading-[48px] align-middle text-center cursor-pointer">
              Cart
            </div>
            <Image
              src="/cart.svg"
              alt=""
              width={50}
              height={50}
              className="cursor-pointer"
            ></Image>
          </div>
          <Image
            src="/avatar.svg"
            alt=""
            width={50}
            height={50}
            className="cursor-pointer"
          ></Image>
        </div>
      </div>

      {/* <div className=" rounded-lg bg-[rgb(11,10,15)] block lg:hidden ml-8 mt-12 -mb-8 w-fit">
            <Image src="/menu.png" alt="" width={65} height={65} className="cursor-pointer" onClick={togglenav}></Image>
            { isOpen && (
                <div className=" rounded-lg max-w-[300px] pl-7 pt-5 pr-7 pb-3 space-y-5">
                    <div className="navllinks flex justify-between  items-center space-x-7">
                
                
                <div className="Cart flex">
                    <div className="h-[50px] w-[70px] bg-black rounded-3xl leading-[48px] align-middle text-center cursor-pointer">
                        Cart
                    </div>
                    <Image src="/cart.svg" alt="" width={50} height={50} className="cursor-pointer"></Image>
                </div>
                <Image src="/avatar.svg" alt="" width={50} height={50} className="cursor-pointer"></Image>

            </div>
            <div className="space-y-4">
            <Image src="/search-icon.svg" alt="" width={32} height={32} className="cursor-pointer"></Image>
        
        <Link href="/store" className="block">Store</Link>
        <Link href="/" className="block">Destroy My Design</Link>
        <Link href="/product-listing" className="block">Categories</Link>
        <Link href="/about" className="block">About</Link>
        </div>
            </div>
            

            )
        }
        </div> */}
      <div className="block lg:hidden">
        <Sheet>
          <SheetTrigger>
            <Image
              src="/menu.png"
              alt=""
              width={65}
              height={65}
              className="cursor-pointer"
            ></Image>
          </SheetTrigger>
          <SheetContent side="left" className="w-full bg-black" icon="h-8 w-8">
            <SheetHeader>
              <SheetDescription>
                <div className=" space-y-10 text-white p-5">
                  <div className="flex justify-start  items-center gap-3">
                    <Image
                      src="/cart.svg"
                      alt=""
                      width={50}
                      height={50}
                      className="cursor-pointer "
                    ></Image>

                    <Image
                      src="/avatar.svg"
                      alt=""
                      width={50}
                      height={50}
                      className="cursor-pointer"
                    ></Image>
                  </div>
                  <div className=" flex flex-col items-start h-full gap-8 text-2xl  ">
                    <Link href="/store" className="block">
                      Store
                    </Link>
                    <Link href="/" className="block">
                      Destroy My Design
                    </Link>
                    <Link href="/product-listing" className="block">
                      Categories
                    </Link>
                    <Link href="/about" className="block">
                      About
                    </Link>
                  </div>
                </div>
              </SheetDescription>
            </SheetHeader>
          </SheetContent>
        </Sheet>
      </div>
    </div>
  );
}
