"use client"
import React,{useEffect, useState} from "react";
import { useForm } from "react-hook-form";
import {toast as t,Toaster} from "react-hot-toast";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@/lib/Auth";
import { addData,GetUserData } from "@/lib/firestore";
import { useToast } from "@/components/ui/use-toast"


type FormValues = {
    reason: string;
    day:string;
    dep:string;
    type:String;
    file:String;
    From: string;
    To: string;
};

// displayName
// photoURL
//email
//
export default function UserForm({show}:any) {
    const [user, loading, error] = useAuthState(auth);

    const { toast } = useToast()
    const {
        register,
        handleSubmit,
        watch,
        reset,
        formState,
        formState: { isSubmitSuccessful,errors },
    } = useForm<FormValues>();

    const onSubmit = async (data: FormValues) => {
        // console.log(user);
        if(data.type=="ML"){
            // console.log(data.file.length)
            if(data.file.length == 0){
                t.error("Upload Medical Document!")
                reset({type:"CL"})
                // reset({type:"ML"})
                return
            }
        }
        console.log(data.file);
        await addData(data,user?.uid,user?.displayName,user?.email,user?.photoURL)
        toast({
            title: "Remember!",
            description: "You Will Get Email Notification about leave update!",
          })
          show()

    };

    React.useEffect(() => {

        if (formState.isSubmitSuccessful) {
          reset({ reason: '',From:"",To:""});
        }
      }, [formState, reset]);
    return (
        <>
        <Toaster/>
        <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col m-10 mt-[55px]"
        >
            <textarea
                placeholder="Reason for leave"
                className="p-1 m-5 w-96 h-40 rounded-md border-2 "
                {...register("reason", { required: true, maxLength: 280 })}
            />
            <span className="ml-5">
                Department:
            </span>
            <select
            className="p-1 m-5 rounded-md border-2"
            {...register("dep", { required: true })}>
                <option value="CSE">CSE</option>
                <option value="IT">IT</option>
                <option value="ENTC">ENTC</option>
                <option value="MECH">MECH</option>
                <option value="CIVIL">CIVIL</option>
                <option value="PROD">PROD</option>
            </select>
            <span className="ml-5">
                Type Of leave:
            </span>
            <select
            className="p-1 m-5 rounded-md border-2"
            {...register("type", { required: true })}>
                <option value="CL">CL</option>
                <option value="CEL">CEL</option>
                <option value="CML">CML</option>
                <option value="ML">ML</option>
                <option value="EL">EL</option>
            </select>
            {watch("type")=="ML"?(
                    <>
                    <span className="ml-5">
                Medical Document*:
            </span>
                    <input type="file"
            className="p-1 m-5 rounded-md border-2"
            {...register("file", {})} />

                    </>
            ):(null)}
            <select
            className="p-1 m-5 rounded-md border-2"
            {...register("day", { required: true })}>
                <option value="one">One Day</option>
                <option value="more">More than One day</option>
            </select>
            <span className="ml-5">
                Date of leave*:
            </span>
            <input
                type="date"
                placeholder="From"
                className="p-1 m-5 rounded-md border-2"
                {...register("From", { required: true })}
            />
            {watch("day")=="more"?(
                <>
                <span className="ml-5">
                To:
            </span>
            <input type="date"
            className="p-1 m-5 rounded-md border-2"
            placeholder="To" {...register("To", {})} /> </>):(null)}
            <input type="submit" className="bg-blue-500 p-1 m-5 rounded-md" />
        </form>
        </>
    );
}
