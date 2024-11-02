// @ts-nocheck
import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import { GetAdminData, UpdateStatus } from '@/lib/firestore';
import {toast as t ,Toaster} from "react-hot-toast";



export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


export const Accept = async  (email,name,reason,from,type,to) => {



  // Update leaves according to date to - from in sheet
  // solve corss problem
  async function updateSheetData() {

    const typed = {
      "CL":1,
      "CEL":2,
      "CML":3,
      "ML":4,
      "EL":5,
    }

    // a and b are javascript Date objects
function dateDiffInDays(a, b) {
  const _MS_PER_DAY = 1000 * 60 * 60 * 24;
  // Discard the time and time-zone information.
  const utc1 = Date.UTC(a.getFullYear(), a.getMonth(), a.getDate());
  const utc2 = Date.UTC(b.getFullYear(), b.getMonth(), b.getDate());

  return Math.floor((utc2 - utc1) / _MS_PER_DAY);
}




    const response = await fetch(`https://leave-system.vercel.app/api/sheet?email=${email}`,{
      method: 'GET',
    });

    if (!response.ok) {
      const message = `An error has occured: ${response.status}`;
      // throw new Error(message);
      t.error("Something Went Wrong!")
      return
    }

    const res = await response.json();
    const data = res.data
    console.log("sheet data"+ data)
    console.log("to"+ typeof(to))
    if (data == "failed" || data == "provide Email"){
      t.error("Something Went Wrong!")
      return
    }
    var obj = {};
    if(to == "null" || to == ""){
      obj = {
        "email":email,
        "type":type,
        "value":(parseInt(data[0][typed[type]]) - (1))
      }

    }else{
         // test it
    const a = new Date(from),
    b = new Date(to),
    difference = dateDiffInDays(a, b);
    console.log(a,b)
    console.log("days"+ (difference))
 obj = {
  "email":email,
  "type":type,
  "value":(parseInt(data[0][typed[type]]) - (difference + 1) )
}
    }
    console.log("obj" + JSON.stringify(obj))

    const responseUP = await fetch(`https://leave-system.vercel.app/api/sheet`,{
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body:JSON.stringify(obj)
    });

    if (!responseUP.ok) {
      const message = `An error has occurred: ${responseUP.status}`;
      console.log(message);
      // throw new Error(message);
      t.error("Something Went Wrong!")
    }

    const res2 = await responseUP.json();
    const data2 = res2.msg
    if (data2== "failed"){
      t.error("Something Went Wrong!")
      return
    }
    console.log("sheet updated data"+ JSON.stringify(res2))
    // return movies;
  }

  updateSheetData().catch(error => {
    console.log(error.message)
    return // 'An error has occurred: 404'
  });



  const s = t.loading("Sending Mail!")
  const res = await fetch('/api/email',{
    method:"POST",
    body: JSON.stringify({
      email,
      name,
      reason,
      from,
      status:"accepted"
    }),
    headers: { "Content-Type": "application/json", Accept: "application/json" },
  })
  t.dismiss(s)
  await UpdateStatus(reason,from,"success")
  alert("successfully Accepted")
  window.location.reload()
}



export const Reject =async (email,name,reason,from) => {
const s = t.loading("Sending Mail!")
const res = await fetch('/api/email',{
  method:"POST",
  body: JSON.stringify({
    email,
    name,
    reason,
    from,
    status:"rejected"
  }),
  headers: { "Content-Type": "application/json", Accept: "application/json" },
})
t.dismiss(s)
await UpdateStatus(reason,from,"failed")
alert("successfully Rejected")
window.location.reload()
}
