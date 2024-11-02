// @ts-nocheck
"use client"

import Login from "@/components/Login"
import Image from "next/image"
import { useEffect } from "react"
import { useAuthState } from "react-firebase-hooks/auth";
import { auth,SignOut } from "@/lib/Auth";
import toast, { Toaster } from 'react-hot-toast';
import { useRouter } from "next/navigation";

export default function Home() {



  return (
    <>
    {/* <Image
    src='/logo.ico'
    alt='Home'
    width={100}
    height={100}
    /> */}

    <div className="flex w-[100%] flex-col">
    {/* <h1 className="" >
      Leave System
    </h1 > */}
    <Toaster/>
    <Login/>
    </div>
    </>
  )
}
