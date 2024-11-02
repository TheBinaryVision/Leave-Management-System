// @ts-nocheck
"use client"
import { useToast } from "@/components/ui/use-toast"
import React from 'react'
import Image from 'next/image'
import { useEffect,useState } from 'react'
import { auth, SignOut } from "@/lib/Auth";
import { useAuthState } from "react-firebase-hooks/auth";
import { useRouter } from "next/navigation";
import UserForm from '@/components/UserForm';
import UserData from '@/components/UserData';
import { GetAdminData, UpdateStatus } from '@/lib/firestore';
import AdminLogin from '@/components/adminLogin';
import { DataTable } from "@/components/ui/data-table"
import { adminColumns } from "@/components/table/adminColumns"
// import {
//   Dialog,
//   DialogContent,
//   DialogDescription,
//   DialogHeader,
//   DialogTitle,
//   DialogTrigger,
// } from "@/components/ui/dialog"
import {toast as t ,Toaster} from "react-hot-toast";




function Home() {
  const [user, loading, error] = useAuthState(auth);
  const router = useRouter();
  const [data,setData] = useState<Object>([])
  const { toast } = useToast()
   // console.log(watch("day"));
  const GetDep = async () => {
    const url = "/api"
      const res = await fetch(document.location.origin + url,{
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: JSON.stringify({"uid":user?.uid}),
      })

      const result = await res.json();
      console.log(result)
      if (result.dep === "False"){
        toast({
          title: "wait! You're Not A admin",
          description: "Mail at saigenix@opemic.com to became admin",
        })
        SignOut()
      }

      return result.dep
  }



  const showData = async () => {
    if(user?.uid){
      const s = t.loading("Loading Data!")
      const dep =await GetDep()
      setData(await GetAdminData(dep))
      t.dismiss(s);
    }
    console.log(data)
  }

  useEffect(() => {
    // if(!user){
    //   if (!loading){
    //     router.push("/admin")
    //   }

    // }
    showData()
  },[user])
  return (
      <>
    <Toaster/>
        {(!user && !loading)?<AdminLogin/>:<div className="m-10 w-[100%] p-5 rounded-sm">

{/* requests */}
{/* {data.length != 0 && data.map((e:any)=>{
    console.log(e.uid);

})} */}
<div className="container">
<DataTable columns={adminColumns} data={data} />
</div>
</div>}

      </>
  )
}

export default Home