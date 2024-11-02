"use client"
import React, { useEffect,useState } from 'react'
import { auth, SignOut } from "@/lib/Auth";
import { useAuthState } from "react-firebase-hooks/auth";
import { useRouter } from "next/navigation";
import UserForm from '@/components/UserForm';
import UserData from '@/components/UserData';
import { GetUserData } from '@/lib/firestore';
import {toast as t ,Toaster} from "react-hot-toast";

function Home() {
  const [user, loading, error] = useAuthState(auth);
  const router = useRouter();
  const [data,setData] = useState<Object>([])
   // console.log(watch("day"));
  const showData = async () => {
    if(user?.uid){
      const s = t.loading("Loading data!")
      setData(await GetUserData(user?.uid))
      t.dismiss(s)
    }
    console.log(data)
  }

  useEffect(() => {
    if(!user){
      if (!loading){
        router.push("/")
      }

    }
    showData()
  },[user])

  return (
    <>
    <Toaster/>
    <div className="flex">
    <UserForm show={showData}/>
    <UserData data={data} />
    </div>
    </>
  )
}

export default Home