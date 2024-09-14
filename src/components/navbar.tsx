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
import NavSign from "./ui/navsign";
export default function Navbar() {
  return (
    <div className="">
      <div className=" hidden  navbar lg:flex justify-between mx-20 mt-8 ">
        <Link href="/">
          <Image src="/logo.svg" alt="" width={70} height={45}></Image>
        </Link>

        <div className="navllinks flex gap-12 items-center">
          <Link href="/">Home</Link>
          <Link href="/store">Store</Link>
          {/* <Link href="/product-listing">Categories</Link> */}
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
          <NavSign></NavSign>
        </div>
      </div>

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
                    <Link href="/dashboard" className="block">
                      Dashboard
                    </Link>
                    <Link href="/dashboard/profile" className="block">
                      Profile
                    </Link>
                    <Link href="/dashboard/settings" className="block">
                      Settings
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
