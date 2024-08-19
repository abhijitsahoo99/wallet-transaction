"use client"
import Link from "next/link";
import React from "react";
import signUp from "../../lib/actions/signUp";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";


function SignUp() {
  const [name, setName] = React.useState("");
  const [phone, setPhone] = React.useState("");
  const router = useRouter()

  const signInHandler = async () => {
    await signIn("credentials" , {
      number: phone,
      redirect: false,
    })
    router.push("/dashboard")
  }


const signUpHandler = async () => {
  try{
   const res =  await signUp(name, phone);
   if(res?.status){
    signInHandler();
   }else {
    throw new Error ("SignUp Error")
   }
  } catch(error){
    console.error(error)
  }
}

  return (
    <div className="flex justify-around items-center h-screen">
      <div>
        <p className="text-7xl text-[rgb(96,165,250)]">Welcome to WalletX</p>
      </div>
      <div>
        <p className="text-center pb-2 text-[rgb(96,165,250)] text-3xl">
          Create an account
        </p>
        
        <div className="border-2 rounded-3xl p-8 flex flex-col">
        <div className="flex flex-col my-1 gap-1 w-80 ">
            <label className="text-[rgb(96,165,250)]">Name</label>
            <input
              type="text"
              className="border-2 rounded-xl p-2 placeholder-gray-500"
              placeholder="Enter your name"
              onChange={(e) => setName(e.target.value)}
            ></input>
          </div>
          <div className="flex flex-col my-1 gap-1 w-80">
            <label className="text-[rgb(96,165,250)]">Phone</label>
            <input
              type="text"
              className="border-2 rounded-xl p-2 placeholder-gray-500"
              placeholder="Enter your phone number"
              onChange={(e) => setPhone(e.target.value)}
            ></input>
          </div>
          <div className="flex flex-col my-1 gap-1 w-80">
            <label className="text-[rgb(96,165,250)]">Password</label>
            <input
              type="text"
              className="border-2 rounded-xl p-2 placeholder-gray-500"
              placeholder="Enter your password"
            ></input>
          </div>
          <div className="flex flex-col my-1  gap-1">
            <label className="text-[rgb(96,165,250)]">OTP</label>
            <div className="flex gap-2">

            <input
              type="text"
              className="border-2 rounded-xl p-2 w-10 "
            ></input>
                      <input
              type="text"
              className="border-2 rounded-xl p-2 w-10"
            ></input>
                      <input
              type="text"
              className="border-2 rounded-xl p-2 w-10 "
            ></input>
                      <input
              type="text"
              className="border-2 rounded-xl p-2 w-10"
            ></input>
            </div>
          </div>
          <div className=" border-1 bg-[rgb(96,165,250)] rounded-xl mt-4 px-2 py-2 text-white text-center ">
            <button onClick={signUpHandler}>Sign up</button>
          </div>
        </div>
        <p className=" text-[rgb(96,165,250)] text-center mt-2 ">
       Already have an account? <Link href="/signin">Sign in</Link>
        </p>
      </div>
    </div>
  );
}

export default SignUp;
