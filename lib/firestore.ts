// @ts-nocheck
import { app,storage } from "./Firebase";
import { getFirestore } from "firebase/firestore";
import { doc, addDoc,collection,updateDoc } from "firebase/firestore";
import toast from "react-hot-toast";
import {query, where, getDocs } from "firebase/firestore";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
// import { resolve } from "path";
const db = getFirestore(app);


export const addData = async (data:any,uid:any,name:any,email:any,profile:any) => {
  const s = toast.loading("Submitting Data!")
  if (data.file){
    console.log(data.file.length)
  }
  if (data.To == undefined) {
      data.To="null"
  }

  if (data.file && data.file.length != 0){
    // console.log("rrrrrr",data.file[0])
    const fn = async (url)=>{
      const pr = await addDoc(collection(db, "users"), {
        From: data.From,
        To:data.To,
        day: data.day,
        type: data.type,
        file:url,
        reason: data.reason,
        dep:data.dep,
        uid:uid,
        name:name,
        email:email,
        profile:profile,
        leaveStatus:"pending"
      });
    }
    UploadImage(fn,data.file[0])

  }else{
    const pr = await addDoc(collection(db, "users"), {
      From: data.From,
      To:data.To,
      day: data.day,
      type: data.type,
      file:"null",
      reason: data.reason,
      dep:data.dep,
      uid:uid,
      name:name,
      email:email,
      profile:profile,
      leaveStatus:"pending"
    });
  }



      // toast.promise(pr, {
      //       loading: 'Loading',
      //       success: 'data added successfully',
      //       error: 'Error',
      //     });
      // s.dismiss()
      toast.dismiss(s);
      toast.success('Successfully submitted!');
}
// Add a new document in collection "cities"
export const GetUserData= async (uid:any) => {
  const q = query(collection(db, "users"), where("uid", "==", uid ));

  const querySnapshot = await getDocs(q);

  let arr = []
  querySnapshot.forEach((doc) => {
  // doc.data() is never undefined for query doc snapshots
  // console.log(doc.id, " => ", doc.data());
      arr.push(doc.data())
    });
  // console.log(arr[0].uid)

  return arr


}

export const GetAdminData= async (dep:string) => {

  const q = query(collection(db, "users"), where("dep", "==", dep),where("leaveStatus","==","pending"));

  const querySnapshot = await getDocs(q);

  let arr = []
  querySnapshot.forEach((doc) => {
  // doc.data() is never undefined for query doc snapshots
  // console.log(doc.id, " => ", doc.data());
      arr.push(doc.data())
    });
  // console.log(arr[0].uid)

  return arr
}



export const UpdateStatus =async (reason ,from,Lstatus) => {
  const s = toast.loading("Saving Changes!")
  const q = query(collection(db, "users"), where("reason", "==", reason),where("From","==",from));

  const querySnapshot = await getDocs(q);

  let arr = []
  querySnapshot.forEach((doc) => {
  // doc.data() is never undefined for query doc snapshots
  // console.log(doc.id, " => ", doc.data());
      arr.push(doc.id)
    });
  // console.log(arr[0])
  const Ref = doc(db, "users", arr[0]);

  // Set the "capital" field of the city 'DC'
await updateDoc(Ref, {
  leaveStatus:Lstatus
});
toast.dismiss(s);
}

const UploadImage = (fn,file) => {


  const storageRef = ref(storage, file.name);
  const uploadTask = uploadBytesResumable(storageRef, file);

// Listen for state changes, errors, and completion of the upload.
uploadTask.on('state_changed',
  (snapshot) => {
    // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
    const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
    console.log('Upload is ' + progress + '% done');
    switch (snapshot.state) {
      case 'paused':
        console.log('Upload is paused');
        break;
      case 'running':
        console.log('Upload is running');
        break;
    }
  },
  (error) => {
    // A full list of error codes is available at
    // https://firebase.google.com/docs/storage/web/handle-errors
    switch (error.code) {
      case 'storage/unauthorized':
        // User doesn't have permission to access the object
        break;
      case 'storage/canceled':
        // User canceled the upload
        break;

      // ...

      case 'storage/unknown':
        // Unknown error occurred, inspect error.serverResponse
        break;
    }
  },
  () => {
    // Upload completed successfully, now we can get the download URL
     getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
      console.log('File available at', downloadURL);
      fn(downloadURL);
    });
  }
);

}