import { getAuth, signInWithPopup, GoogleAuthProvider,signOut } from "firebase/auth";
import { provider,app } from "@/lib/Firebase"

export const auth = getAuth(app)

export const  LoginWithGoogle = (UserType:string)=>{




signInWithPopup(auth, provider)
  .then(async (result) => {
    // This gives you a Google Access Token. You can use it to access the Google API.
    const credential = GoogleAuthProvider.credentialFromResult(result);
    // const token = credential.accessToken;
    // The signed-in user info.
    const user = result.user;
    console.log(user)
    if (UserType === "admin"){
      const url = "/api"
      const res = await fetch(document.location.origin + url,{
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: JSON.stringify({"uid":user.uid}),
      })

      const result = await res.json();
      console.log(result)
      if (result.dep === "False"){
        signOut(auth)
      }
    }
    // IdP data available using getAdditionalUserInfo(result)

    // ...
  }).catch((error) => {
    // Handle Errors here.
    const errorCode = error.code;
    const errorMessage = error.message;
    // The email of the user's account used.
    const email = error.customData.email;
    // The AuthCredential type that was used.
    const credential = GoogleAuthProvider.credentialFromError(error);
    // ...
  });
  }

  export const SignOut = ()=> {
        signOut(auth)
  }